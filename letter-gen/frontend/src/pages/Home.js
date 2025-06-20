import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import jsPDF from 'jspdf';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sender: '',
    senderDesignation: '',
    recipient: '',
    recipientDesignation: '',
    company: '',
    letterType: '',
    tone: '',
    description: ''
  });

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(generatedLetter, 10, 10, { maxWidth: 180 });
    doc.save('generated_letter.pdf');
};

  const handleGenerateLetter = async (e) => {
    e.preventDefault();

    const {sender, senderDesignation, recipient,
  recipientDesignation, company, letterType,
  tone, description
} = formData;


    try {
      const url = "http://localhost:5000/api/letter/generate";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: sender,
          designation: senderDesignation,
          recipient,
          recipientDesignation,
          company,
          letterType,
          tone,
          description
        })
      });

      const result = await response.json();
      if (response.ok) {
        handleSuccess("Letter generated successfully!");
        setGeneratedLetter(result.letter); // You can display it on the screen too
      } else {
        handleError(result?.error || "Failed to generate letter");
      }

    } catch (err) {
      handleError(err.message);
    }
  };
  

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="app-name">LetterGen</div>
        <div className="user-section">
          <span className="welcome">Welcome, {loggedInUser}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Page Content */}
      
      <div className="page-content">
      <div className="form-box large-form-box">
        <h2>Generate a Letter</h2>
        <form onSubmit={handleGenerateLetter}>
          {/* Sender Info */}
            <div className="inputs horizontal-inputs">
            <label>Sender</label>
            <input
                type="text"
                name="sender"
                placeholder="Sender's name"
                value={formData.sender}
                onChange={handleChange}
            />
            </div>

            <div className="inputs horizontal-inputs">
            <label>Sender Designation</label>
            <input
                type="text"
                name="senderDesignation"
                placeholder="e.g. Software Engineer"
                value={formData.senderDesignation}
                onChange={handleChange}
            />
            </div>

            {/* Recipient Info */}
            <div className="inputs horizontal-inputs">
            <label>Recipient</label>
            <input
                type="text"
                name="recipient"
                placeholder="Recipient's name"
                value={formData.recipient}
                onChange={handleChange}
            />
            </div>

            <div className="inputs horizontal-inputs">
            <label>Recipient Designation</label>
            <input
                type="text"
                name="recipientDesignation"
                placeholder="e.g. Manager"
                value={formData.recipientDesignation}
                onChange={handleChange}
            />
            </div>

            <div className="inputs horizontal-inputs">
            <label>Company</label>
            <input
                type="text"
                name="company"
                placeholder="e.g. Acme Corp"
                value={formData.company}
                onChange={handleChange}
            />
            </div>


          <div className="inputs">
            <label>Letter Type</label>
            <select name="letterType" value={formData.letterType} onChange={handleChange}>
              <option value="">Select Letter Type</option>
              <option value="Resignation">Resignation</option>
              <option value="Offer">Offer</option>
              <option value="Recommendation">Recommendation</option>
              <option value="Complaint">Complaint</option>
              <option value="Appreciation">Appreciation</option>
            </select>
          </div>

          <div className="inputs">
            <label>Tone</label>
            <select name="tone" value={formData.tone} onChange={handleChange}>
              <option value="">Select Tone</option>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Formal">Formal</option>
              <option value="Apologetic">Apologetic</option>
            </select>
          </div>

          <div className="inputs">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter letter content or instruction..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">Generate Letter</button>
        </form>
        {/* Show Generated Letter */}
          {generatedLetter && (
            <div className="generated-letter-box">
              <h3>Generated Letter</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{generatedLetter}</p>
              <button onClick={handleDownloadPDF} style ={{ marginTop: '10px'}}>
                Download as PDF
              </button>
            </div>
          )}
      </div>
    </div>


      <ToastContainer />
    </div>
  );
}

export default Home;
