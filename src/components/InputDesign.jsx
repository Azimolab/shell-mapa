"use client";
import * as React from "react";

function InputLabel({ htmlFor, children, required = false, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
}

function InputField({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error = false,
  className = "",
  ariaDescribedBy,
  ...props
}) {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white hover:border-gray-400";

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      required={required}
      disabled={disabled}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      {...props}
    />
  );
}

function InputError({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1 text-sm text-red-600"
    >
      {children}
    </p>
  );
}

function InputHelperText({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      className="mt-1 text-sm text-gray-500"
    >
      {children}
    </p>
  );
}

function TextAreaField({
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error = false,
  rows = 4,
  className = "",
  ariaDescribedBy,
  ...props
}) {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white hover:border-gray-400";

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      required={required}
      disabled={disabled}
      rows={rows}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      {...props}
    />
  );
}

function SelectField({
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error = false,
  children,
  placeholder,
  className = "",
  ariaDescribedBy,
  ...props
}) {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "hover:border-gray-400";

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      required={required}
      disabled={disabled}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}