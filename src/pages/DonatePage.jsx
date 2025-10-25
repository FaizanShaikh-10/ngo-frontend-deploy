// src/pages/DonatePage.jsx

import { useState, useEffect } from 'react'; 
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
// No 'react-razorpay' import needed

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => { resolve(true); };
    script.onerror = () => { resolve(false); };
    document.body.appendChild(script);
  });
};

function DonatePage() {
  const [amount, setAmount] = useState(10);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false); 

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePaymentSuccess = async (response) => { 
    console.log('Payment Successful:', response);
    setMessage({ type: 'success', text: 'Thank you for your donation! Saving details...' });
    setLoadingPayment(false); 

    try {
      // *** USE HTTPS URL HERE ***
      await axios.post('https://faizan8108.pythonanywhere.com/api/save-donation/', { 
         name: name, 
         email: email, 
         amount_inr: amount, 
         razorpay_payment_id: response.razorpay_payment_id,
         razorpay_order_id: response.razorpay_order_id,
         razorpay_signature: response.razorpay_signature 
      });
       setMessage({ type: 'success', text: 'Thank you! Your donation has been recorded.' });
    } catch (saveError) {
      console.error("Error saving donation:", saveError);
      setMessage({ type: 'warning', text: 'Payment successful, but failed to save details. Please contact support.' });
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment Failed:', error);
    setMessage({
      type: 'danger',
      text: `Payment Failed: ${error?.error?.description || error?.error?.reason || 'Please try again.'}`,
    });
    setLoadingPayment(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoadingPayment(true); 

    const scriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!scriptLoaded) {
      setMessage({ type: 'danger', text: 'Payment gateway failed to load. Please check your connection.' });
      setLoadingPayment(false); return;
    }
     if (!window.Razorpay) {
       setMessage({ type: 'danger', text: 'Payment gateway object not found. Please try refreshing.' });
       setLoadingPayment(false); return;
    }

    try {
      // *** USE HTTPS URL HERE ***
      const { data: order } = await axios.post(
        'https://faizan8108.pythonanywhere.com/api/create-razorpay-order/',
        {
          amount: amount,
          name: name,
          email: email,
        }
      );

      if (!order || !order.id) { throw new Error("Invalid order response from server"); }

      const options = {
        key: 'rzp_test_RW7w2dlCFf6xz4', // Your Key ID
        amount: order.amount,           
        currency: order.currency,
        name: 'NGO Website Donation',
        description: 'Support Our Cause',
        order_id: order.id,            
        handler: handlePaymentSuccess,   
        modal: { ondismiss: function(){ setLoadingPayment(false); } },
        prefill: { name: name, email: email, },
        notes: { address: 'NGO Website Headquarters', },
        theme: { color: '#3399cc', },
      };

      const rzpInstance = new window.Razorpay(options); 
      rzpInstance.on('payment.failed', handlePaymentError);
      rzpInstance.open();

    } catch (error) {
      console.error('Error during payment process:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error starting payment. Please try again.';
      setMessage({ type: 'danger', text: errorMessage });
      setLoadingPayment(false); 
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1>Support Our Cause</h1>
          <p>Your contribution makes a world of difference.</p>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={submitHandler}>
             <Form.Group className="mb-3"> <Form.Label>Donation Amount (INR)</Form.Label> <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" required /> </Form.Group>
            <Form.Group className="mb-3"> <Form.Label>Full Name</Form.Label> <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /> </Form.Group>
            <Form.Group className="mb-3"> <Form.Label>Email Address</Form.Label> <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> </Form.Group>
            <Button variant="success" type="submit" className="w-100" disabled={loadingPayment}> {loadingPayment ? 'Processing...' : 'Donate Now'} </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DonatePage;