import { Image } from "react-bootstrap";

// Component to display password requirements and their validation status
export default function PasswordRequirements({ password }) {
  const isLength = password.length >= 8;
  const isUpper = /[A-Z]/.test(password);
  const isLower = /[a-z]/.test(password);
  const isNumber = /[0-9]/.test(password);
  const isSpecial = /[!@#$%^&*]/.test(password);

  return (
    <div className="password-requirements mt-3">
      <div className="d-flex align-items-center mb-2">
        <Image
          src={isLength ? "/icons/checkRequirement.png" : "/icons/invalidRequiremen.png"}
          alt="Requirement"
          className="invalidIcon"
        />
        <span className="custom-font mt-1">At least 8 characters</span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <Image
          src={isUpper ? "/icons/checkRequirement.png" : "/icons/invalidRequiremen.png"}
          alt="Requirement"
          className="invalidIcon"
        />
        <span className="custom-font mt-1">Must include at least one uppercase letter (A–Z)</span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <Image
          src={isLower ? "/icons/checkRequirement.png" : "/icons/invalidRequiremen.png"}
          alt="Requirement"
          className="invalidIcon"
        />
        <span className="custom-font">Must include at least one lowercase letter (a–z)</span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <Image
          src={isNumber ? "/icons/checkRequirement.png" : "/icons/invalidRequiremen.png"}
          alt="Requirement"
          className="invalidIcon"
        />
        <span className="custom-font">Must include at least one number (0–9)</span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <Image
          src={isSpecial ? "/icons/checkRequirement.png" : "/icons/invalidRequiremen.png"}
          alt="Requirement"
          className="invalidIcon"
        />
        <span className="custom-font">Must include at least one special character (e.g., ! @ # $ % ^ & *)</span>
      </div>
    </div>
  );
}
