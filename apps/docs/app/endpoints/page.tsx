import Layout from '../components/Layout';

const Endpoints : React.FC = () => {
  return (
    <Layout>
      <div className="content">
        <h1>API Endpoints</h1>
        
        <section>
          <h2>User Endpoints</h2>
          
          <div className="endpoint">
            <h3>POST /auth/signup</h3>
            <p>Create a new user account</p>
            <pre>
              <code>
                {`{
  "email": "user@example.com",
  "name": "User Name",
  "password": "password123"
}`}
              </code>
            </pre>
          </div>
          
          <div className="endpoint">
            <h3>GET /user/profile</h3>
            <p>Get user profile (requires authentication)</p>
            <pre>
              <code>
                {`{
  "id": "user_id",
  "email": "user@example.com",
  "name": "User Name"
}`}
              </code>
            </pre>
          </div>
        </section>
        
        <section>
          <h2>Admin Endpoints</h2>
          
          <div className="endpoint">
            <h3>GET /admin/users</h3>
            <p>Get all users (requires admin authentication)</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
export default Endpoints