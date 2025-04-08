"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Layout from './components/Layout';

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

const Home : React.FC = () => {
  return (
    <Layout>
      <div className="content">
        <h1>Express Server API Documentation</h1>
        <p className="lead">
          Welcome to the API documentation for the Express server. This documentation will help you understand how to interact with our API endpoints.
        </p>
        
        <section>
          <h2>Quick Links</h2>
          <div className="grid">
            <a href="/getting-started" className="card">
              <h3>Getting Started →</h3>
              <p>Learn how to set up and start using the API</p>
            </a>
            <a href="/authentication" className="card">
              <h3>Authentication →</h3>
              <p>Understand how to authenticate your requests</p>
            </a>
            <a href="/endpoints" className="card">
              <h3>API Endpoints →</h3>
              <p>Explore all available endpoints</p>
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
export default Home