import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="py-5 sm:px-0 px-3">
      <section className="flex flex-col items-center justify-center">
        <div className="h-auto w-auto sm:p-5 px-20">
          <Image
            src="/images/smartbuys_wings.webp"
            alt="SmartBuys Philippines"
            width={555}
            height={555}
            loading="eager"
            fetchPriority="high"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            className={`object-cover hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer ${
              process.env.NODE_ENV === 'production' ? 'pointer-events-none' : ''
            }`}
          />
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Privacy Policy
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <span className="md:text-xl font-medium tracking-wider">
            This privacy policy applies to&nbsp;<b>ALL</b>&nbsp;mobile
            application/s (referred to as the &nbsp;
            <b>&quot;Application&quot;</b>
            &nbsp;) developed by&nbsp;
            <b>Chester Javier, Managing Technical Director</b>&nbsp; of&nbsp;
            <b>SMARTBUYS PHILIPPINES ENTERPRISES OPC</b>&nbsp; (referred to as
            the &nbsp;<b>&quot;Developer&quot;</b>&nbsp;). This policy is
            intended to inform users of the Application about the collection,
            use, and sharing of their personal information.
          </span>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Information Collection and Use
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Application collects user information during download and usage.
            This may include:
          </p>
          <ul className="list-disc inline ml-12 text-lg">
            <li>Device’s Internet Protocol (IP) address</li>
            <li>Pages accessed, time spent, and date of visits</li>
            <li>Mobile device operating system details</li>
            <li>Usage duration of the Application</li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Personal Data Collection
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Application may request users&apos; personally identifiable
            information, such as:
          </p>
          <ul className="list-disc inline ml-12 text-lg">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
          </ul>
          <p className="md:text-xl font-medium tracking-wider">
            This data is retained and utilized to provide a better user
            experience and to deliver essential notifications.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Third-Party Access
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Application employs third-party services for functionality and
            performance improvement. These services may collect data in
            accordance with their own privacy policies. The third-party services
            used by the Application include:
          </p>
          <Link
            href={'https://policies.google.com/privacy'}
            rel="noopener noreferrer"
            target="_blank"
          >
            <li className="text-xl font-medium my-5">
              <span className="text-blue-600">Google Play Service</span>
            </li>
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">Data Sharing</span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Developer may share personal and sensitive user data under the
            following conditions:
          </p>
          <ul className="list-disc inline ml-12 text-lg">
            <li>
              When required by law, such as in response to a legal process or
              government request.
            </li>
            <li>To protect the rights and safety of users or others.</li>
            <li>
              With trusted service providers acting on behalf of the Developer,
              who adhere to this privacy policy.
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Opt-Out Rights
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            Users may stop the collection of information by uninstalling the
            Application using the standard uninstall procedure available through
            their device or application store.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Data Retention Policy
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            User-provided data is retained for as long as the Application is in
            use and for a reasonable period afterward. Users may request data
            deletion by contacting the Developer at smartbuys@duck.com.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Children&apos;s Privacy
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Application does not knowingly collect information from children
            under the age of 13. If the Developer becomes aware of such data, it
            will be promptly deleted. If you are a parent or guardian and
            believe your child has provided personal information, please contact
            the Developer.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">Security</span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            The Developer is committed to securing user data. Physical,
            electronic, and procedural safeguards are in place to protect
            collected information.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Changes to this Privacy Policy
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            This privacy policy may be updated periodically. The Developer will
            post any changes on this page. Continued use of the Application
            indicates consent to the updated policy.
          </p>
          <div className="">
            <span className="text-xl font-semibold mr-5">Effective Date:</span>
            <span className="text-xl font-semibold">2024-04-02</span>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10">
        <span className="md:text-4xl text-3xl md:mb-5 mb-1">
          Contact Information
        </span>
        <div className="flex flex-col my-3 gap-y-3">
          <p className="md:text-xl font-medium tracking-wider">
            For privacy inquiries or concerns, please contact the Developer at:
          </p>
          <Link
            href={'mailto:smartbuys@duck.com'}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-xl font-semibold uppercase">Email:</span>
            <span className="text-blue-600 text-xl ml-3">
              smartbuys@duck.com
            </span>
          </Link>
          <div className="mb-28" />
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
