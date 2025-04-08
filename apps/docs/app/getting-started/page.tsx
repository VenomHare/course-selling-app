import Layout from "../components/Layout";

const GettingStarted: React.FC = () => {
  return (
    <Layout>
      <div className="content">
        <h1>Getting Started</h1>

        <section>
          <h2>Prerequisites</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Node.js (v18 or higher)</li>
            <li>PostgreSQL</li>
            <li>pnpm (recommended) or npm</li>
          </ul>
        </section>

        <section>
          <h2>Installation</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <h3>Clone the Repository</h3>
              <pre className="mt-2">
                <code>
                  git clone https://github.com/your-repo/express-server.git
                </code>
              </pre>
            </li>

            <li>
              <h3>Install Dependencies</h3>
              <pre className="mt-2">
                <code>pnpm install</code>
              </pre>
            </li>

            <li>
              <h3>Database Setup</h3>
              <p>
                Create a PostgreSQL database and update the environment
                variables:
              </p>
              <pre className="mt-2">
                <code>
                  {`# In packages/db/.env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"`}
                </code>
              </pre>
              <p>Run database migrations:</p>
              <pre className="mt-2">
                <code>pnpm --filter @repo/db db:migrate</code>
              </pre>
            </li>

            <li>
              <h3>Environment Setup</h3>
              <p>Create environment files for each app:</p>
              <pre className="mt-2">
                <code>
                  {`# In apps/server/.env
JWT_SECRET="your-jwt-secret"
ADMIN_JWT_SECRET="your-admin-jwt-secret"

# In apps/web/.env
VITE_API_URL="http://localhost:3010"

# In apps/admin/.env
VITE_API_URL="http://localhost:3010/admin"`}
                </code>
              </pre>
            </li>

            <li>
              <h3>Start Development Servers</h3>
              <p>Start all services in development mode:</p>
              <pre className="mt-2">
                <code>pnpm dev</code>
              </pre>
              <p>Or start individual services:</p>
              <pre className="mt-2">
                <code>
                  {`# Start backend
pnpm --filter @repo/server dev

# Start web frontend
pnpm --filter @repo/web dev

# Start admin frontend
pnpm --filter @repo/admin dev`}
                </code>
              </pre>
            </li>
          </ol>
        </section>

        <section>
          <h2>Project Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="card">
              <h3>@web</h3>
              <p>Frontend for end users to purchase and view courses</p>
              <p className="text-sm text-gray-400">Built with Vite + React</p>
            </div>
            <div className="card">
              <h3>@admin</h3>
              <p>Frontend for course creators to manage courses</p>
              <p className="text-sm text-gray-400">Built with Vite + React</p>
            </div>
            <div className="card">
              <h3>@server</h3>
              <p>Backend API server</p>
              <p className="text-sm text-gray-400">Built with Express</p>
            </div>
            <div className="card">
              <h3>@db</h3>
              <p>Database management with Prisma</p>
              <p className="text-sm text-gray-400">PostgreSQL</p>
            </div>
            <div className="card">
              <h3>@types</h3>
              <p>Shared types for frontend and backend</p>
              <p className="text-sm text-gray-400">TypeScript</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Available Scripts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="card">
              <h3>Development</h3>
              <pre className="mt-2">
                <code>pnpm dev</code>
              </pre>
            </div>
            <div className="card">
              <h3>Build</h3>
              <pre className="mt-2">
                <code>pnpm build</code>
              </pre>
            </div>
            <div className="card">
              <h3>Database</h3>
              <pre className="mt-2">
                <code>
                  {`pnpm --filter @repo/db db:migrate
pnpm --filter @repo/db db:generate`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default GettingStarted;
