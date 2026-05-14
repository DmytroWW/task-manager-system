// src/components/Button.jsx
const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-accent text-white font-medium px-6 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;