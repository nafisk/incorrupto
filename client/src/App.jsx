import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Ensure this is correctly imported

function App() {
  // State to hold the article link input by the user
  const [articleLink, setArticleLink] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form behavior

    // The endpoint where you want to send the article link
    // Replace with your actual Flask endpoint
    const endpoint = 'http://127.0.0.1:5000/submit-article-link';

    try {
      // Sending a POST request to the Flask endpoint with the article link
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleLink }), // Sending the article link as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handling the response data here
      const data = await response.json();
      console.log('Submission Successful:', data);
      // You can perform actions based on the response here, like showing a success message
    } catch (error) {
      console.error('Submission Error:', error);
      // You can handle errors here, like showing an error message to the user
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Submit Article Link</h1>

      {/* Form for submitting the article link */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-2">
          <label htmlFor="articleLink" className="block text-sm font-medium text-gray-700">Article Link</label>
          <input
            type="text"
            id="articleLink"
            name="articleLink"
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter the link here"
            required
          />
        </div>

        {/* Submit button */}
        <Button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
