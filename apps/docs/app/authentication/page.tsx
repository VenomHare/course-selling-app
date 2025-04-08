import { FC } from 'react';
import Layout from '../components/Layout';

const Authentication : React.FC = () => {
  return (
    <Layout>
      <div className="content">
        <h1>Authentication</h1>
        
        <section>
          <h2>Overview</h2>
          <p>
            The API uses JWT (JSON Web Tokens) for authentication. All protected endpoints require a valid JWT token in the Authorization header.
          </p>
          
          <h2>Obtaining a Token</h2>
          <p>To obtain a token, make a POST request to the login endpoint:</p>
          
          <div className="endpoint">
            <h3>POST /auth/login</h3>
            <p>Request body:</p>
            <pre>
              <code>
                {`{
                    "email": "user@example.com",
                    "password": "your_password"
                }`}
              </code>
            </pre>
            
            <p>Response:</p>
            <pre>
              <code>
                {`{
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "user": {
                        "id": "user_id",
                        "email": "user@example.com",
                        "name": "User Name"
                    }
                }`}
              </code>
            </pre>
          </div>
          
          <h2>Using the Token</h2>
          <p>Include the token in the Authorization header for protected endpoints:</p>
          <pre>
            <code>Authorization: Bearer your_token_here</code>
          </pre>
        </section>
      </div>
    </Layout>
  );
}
export default Authentication