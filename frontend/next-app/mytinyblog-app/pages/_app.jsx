import "/src/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <div className="inline-block w-full min-h-screen bg-gray-950">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
