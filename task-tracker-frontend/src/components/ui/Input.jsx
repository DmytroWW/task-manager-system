const Input = ({ label, type = "text", placeholder, value, onChange, required = false }) => {
  return (
    <div className="space-y-2 text-left">
      {label && (
        <label className="block text-sm font-semibold text-text-base">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-border bg-card text-text-base
                   placeholder:text-text-muted outline-none transition-all duration-200
                   focus:ring-2 focus:ring-accent/20 focus:border-accent"
      />
    </div>
  );
};

export default Input;