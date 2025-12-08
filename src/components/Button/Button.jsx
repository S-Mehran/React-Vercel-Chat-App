import React from 'react';
import './Button.css';

/**
 * Reusable Button Component for Chat Application
 * 
 * @component
 * @example
 * // Basic button
 * <Button>Click me</Button>
 * 
 * @example
 * // Primary action button
 * <Button variant="primary" onClick={handleSend}>Send Message</Button>
 * 
 * @example
 * // Danger button with loading state
 * <Button variant="danger" isLoading>Deleting...</Button>
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button text or content
 * @param {string} [props.variant='primary'] - Button style variant: 'primary', 'secondary', 'danger', 'success', 'outline'
 * @param {string} [props.size='medium'] - Button size: 'small', 'medium', 'large'
 * @param {boolean} [props.isLoading=false] - Show loading state
 * @param {boolean} [props.disabled=false] - Disable the button
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type='button'] - HTML button type: 'button', 'submit', 'reset'
 * @param {string} [props.title] - Tooltip text on hover
 * @param {boolean} [props.fullWidth=false] - Make button take full width
 * @param {string} [props.icon] - Icon class or element to display
 * @param {string} [props.iconPosition='left'] - Position of icon: 'left' or 'right'
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  title,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const buttonClass = `
    btn
    btn--${variant}
    btn--${size}
    ${fullWidth ? 'btn--full-width' : ''}
    ${isLoading ? 'btn--loading' : ''}
    ${disabled ? 'btn--disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      title={title}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="btn__spinner"></span>
          <span className="btn__text">{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="btn__icon btn__icon--left">{icon}</span>
          )}
          <span className="btn__text">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="btn__icon btn__icon--right">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
