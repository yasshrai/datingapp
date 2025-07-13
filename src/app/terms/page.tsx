import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-zinc-950  dark:text-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl w-full bg-stone-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Terms of Service and Privacy Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            1. Introduction
          </h2>
          <p className="text-lg leading-relaxed">
            Welcome to our platform. This site is intended for educational purposes only. By using our services, you agree to the following terms and conditions. Please read them carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            2. Data Security and Privacy
          </h2>
          <p className="text-lg leading-relaxed">
            We prioritize your privacy and data security. However, please be aware of the following:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
            <li>
              <span className="font-semibold">Data Leakage:</span> In the event of a data leak, we are not responsible for any loss or exposure of your personal information. This project is for educational purposes, and while we take measures to protect your data, we cannot guarantee its absolute security.
            </li>
            <li>
              <span className="font-semibold">Chat and Photo Security:</span> Your chats and uploaded photos are not encrypted and should not be considered secure. Please do not share any sensitive information on this platform.
            </li>
            <li>
              <span className="font-semibold">Email Security:</span> If you log in using your email, your Gmail account details are secure and handled by Google's authentication services. We do not store your password.
            </li>
            <li>
              <span className="font-semibold">File Handling with <a href="https://uploadthing.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">UploadThing</a>:</span> We use <a href="https://uploadthing.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">UploadThing</a> for handling file uploads. Please be aware that under their free tier, files are made publicly accessible and are not private. Therefore, you should not upload any sensitive images or files that you do not want to be publicly available.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            3. User Conduct
          </h2>
          <p className="text-lg leading-relaxed">
            You are solely responsible for your interactions with other users. We do not conduct background checks on our users. Please be cautious and use your best judgment when interacting with others.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            4. Disclaimer
          </h2>
          <p className="text-lg leading-relaxed">
            This service is provided "as is" without any warranties. We do not guarantee that the service will be uninterrupted or error-free. By using this site, you acknowledge and accept these terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
