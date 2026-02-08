import { FadeIn } from "@/components/home/FadeIn";

const Privacy = () => (
  <div className="py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-6">Privacy Policy</h1>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>Last updated: February 2026</p>
          <p>
            WakeupAI ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we
            handle information when you use our website at wakeupai.in.
          </p>

          <h2 className="text-lg font-bold text-foreground">Information We Collect</h2>
          <p>
            WakeupAI does not collect personal information. We do not require registration, login, or
            any form of user account creation.
          </p>
          <p>
            <strong className="text-foreground">Scene Prompts:</strong> The scene ideas you enter are processed in real-time to
            generate cinematic prompts. We do not store, log, or retain any of the content you submit.
          </p>
          <p>
            <strong className="text-foreground">Analytics:</strong> We may use privacy-respecting analytics tools to understand
            general usage patterns (page views, device type, country). This data is aggregated and anonymous.
          </p>

          <h2 className="text-lg font-bold text-foreground">Cookies</h2>
          <p>
            WakeupAI may use essential cookies for functionality (such as theme preference). If
            third-party advertising is enabled in the future, those services may set their own cookies.
            You can manage cookie preferences through your browser settings.
          </p>

          <h2 className="text-lg font-bold text-foreground">Third-Party Services</h2>
          <p>
            We may use third-party services including analytics providers and advertising networks.
            These services have their own privacy policies governing data collection.
          </p>

          <h2 className="text-lg font-bold text-foreground">Your Rights</h2>
          <p>
            Under GDPR and similar regulations, you have the right to access, correct, or delete any
            personal data we may hold. Since we do not collect personal data, these rights are
            inherently satisfied.
          </p>

          <h2 className="text-lg font-bold text-foreground">Data Security</h2>
          <p>
            We use industry-standard security measures to protect our service. All communications with
            our servers are encrypted using HTTPS.
          </p>

          <h2 className="text-lg font-bold text-foreground">Children's Privacy</h2>
          <p>
            WakeupAI is not directed at children under 13. We do not knowingly collect information
            from children.
          </p>

          <h2 className="text-lg font-bold text-foreground">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date.
          </p>

          <h2 className="text-lg font-bold text-foreground">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:dhruvxrana@gmail.com" className="text-foreground underline underline-offset-4">
              dhruvxrana@gmail.com
            </a>
            .
          </p>
        </div>
      </FadeIn>
    </div>
  </div>
);

export default Privacy;
