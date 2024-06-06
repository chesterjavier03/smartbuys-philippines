import { Image } from '@nextui-org/react';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

function PrivacyPolicy() {
  return (
    <>
      <div className='grid grid-cols-1 w-auto justify-items-start place-items-start md:h-[calc(20vh-4rem)] h-auto mx-5 mt-12'>
        <section className='self-center justify-self-center mb-5'>
          <div className='flex object-contain w-80'>
            <Image
              src='/images/smartbuys_wings.webp'
              className={classNames({
                'pointer-events-none': process.env.NODE_ENV === 'production',
              })}
            />
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Privacy Policy
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <span className='md:text-xl font-medium tracking-wider'>
              This privacy policy applies to the SmartBuys Philippines app
              (hereby referred to as "Application") for mobile devices that was
              created by Chester Javier (hereby referred to as "Service
              Provider") as a Free service. This service is intended for use "AS
              IS".
            </span>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Information Collection and Use
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              The Application collects information when you download and use it.
              This information may include information such as:
            </p>
            <ul className='list-disc inline ml-12 text-lg'>
              <li>Your device’s Internet Protocol address (e.g. IP address)</li>
              <li>
                The pages of the Application that you visit, the time and date
                of your visit, the time spent on those pages
              </li>
              <li>The time spent on the Application</li>
              <li>The operating system you use on your mobile device</li>
            </ul>
            <p className='md:text-xl font-medium tracking-wider'>
              The Application does not gather precise information about the
              location of your mobile device
            </p>
            <p className='md:text-xl font-medium tracking-wider'>
              The Service Provider may use the information you provided to
              contact you from time to time to provide you with important
              information, required notices and marketing promotions.
            </p>
            <p className='md:text-xl font-medium tracking-wider'>
              For a better experience, while using the Application, the Service
              Provider may require you to provide us with certain personally
              identifiable information, including but not limited to Email
              Address, and Full Name. The information that the Service Provider
              request will be retained by them and used as described in this
              privacy policy.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Third Party Access
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              Only aggregated, anonymized data is periodically transmitted to
              external services to aid the Service Provider in improving the
              Application and their service. The Service Provider may share your
              information with third parties in the ways that are described in
              this privacy statement.
            </p>
            <p className='md:text-xl font-medium tracking-wider'>
              Please note that the Application utilizes third-party services
              that have their own Privacy Policy about handling data. Below are
              the links to the Privacy Policy of the third-party service
              providers used by the Application:
            </p>
            <Link
              href={
                'https://play.google.com/store/apps/details?id=com.chesterjavier03.smartbuysphilippines'
              }
              rel='noopener noreferrer'
              target='_blank'
            >
              <li className='text-xl font-medium my-5'>
                <span className='text-blue-600'>Google Play Service</span>
              </li>
            </Link>
            <p className='md:text-xl font-medium tracking-wider'>
              The Service Provider may disclose User Provided and Automatically
              Collected Information:
            </p>
            <ul className='list-disc inline ml-12 text-lg'>
              <li>
                as required by law, such as to comply with a subpoena, or
                similar legal process;
              </li>
              <li>
                when they believe in good faith that disclosure is necessary to
                protect their rights, protect your safety or the safety of
                others, investigate fraud, or respond to a government request;
              </li>
              <li>
                with their trusted services providers who work on their behalf,
                do not have an independent use of the information we disclose to
                them, and have agreed to adhere to the rules set forth in this
                privacy statement.
              </li>
            </ul>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Opt-Out Rights
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              You can stop all collection of information by the Application
              easily by uninstalling it. You may use the standard uninstall
              processes as may be available as part of your mobile device or via
              the mobile application marketplace or network.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Data Retention Policy
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              The Service Provider will retain User Provided data for as long as
              you use the Application and for a reasonable time thereafter. If
              you'd like them to delete User Provided Data that you have
              provided via the Application, please contact them at
              smartbuys@duck.com and they will respond in a reasonable time.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>Children</span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              The Service Provider does not use the Application to knowingly
              solicit data from or market to children under the age of 13.
            </p>
            <p className='md:text-xl font-medium tracking-wider'>
              The Application does not address anyone under the age of 13. The
              Service Provider does not knowingly collect personally
              identifiable information from children under 13 years of age. In
              the case the Service Provider discover that a child under 13 has
              provided personal information, the Service Provider will
              immediately delete this from their servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact the Service Provider
              (smartbuys@duck.com) so that they will be able to take the
              necessary actions.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>Security</span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              The Service Provider is concerned about safeguarding the
              confidentiality of your information. The Service Provider provides
              physical, electronic, and procedural safeguards to protect
              information the Service Provider processes and maintains.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>Changes</span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              This Privacy Policy may be updated from time to time for any
              reason. The Service Provider will notify you of any changes to the
              Privacy Policy by updating this page with the new Privacy Policy.
              You are advised to consult this Privacy Policy regularly for any
              changes, as continued use is deemed approval of all changes.
            </p>
            <p className='md:text-xl font-medium tracking-wider'>
              This privacy policy is effective as of 2024-04-02
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>
            Your Consent
          </span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              By using the Application, you are consenting to the processing of
              your information as set forth in this Privacy Policy now and as
              amended by us.
            </p>
          </div>
        </section>
        <section className='flex flex-col gap-2 tracking-widest text-[#1a3d57] mx-12 mt-10'>
          <span className='md:text-4xl text-3xl md:mb-5 mb-1'>Contact Us</span>
          <div className='flex flex-col my-3 gap-y-3'>
            <p className='md:text-xl font-medium tracking-wider'>
              If you have any questions regarding privacy while using the
              Application, or have questions about the practices, please contact
              the Service Provider via email at smartbuys@duck.com.
            </p>
          </div>
          <div className='mb-28' />
        </section>
      </div>
    </>
  );
}

export default PrivacyPolicy;
