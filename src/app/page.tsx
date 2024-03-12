"use client"
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let data = {
      name: name,
      email: email,
      message: message,
    }
    
    console.log("Form submitted:", { name, email, message });
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    }).then((res) => {
      if(res.status === 200) console.log("メールを送信しました")
    })
  };

  return (
    <div className="w-full h-screen">
      <div className="m-5 text-center">
        <h2 className="mb-3 mt-10 text-3xl">Next.js Gmail Application</h2>
        <Form onSubmit={handleSubmit} className="flex justify-center flex-col items-center">
          <div className="mt-5">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-5">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-5">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-5 bg-red-700 p-2 rounded-3xl w-40">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}
