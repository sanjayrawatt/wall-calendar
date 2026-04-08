import './HeroImage.css';

interface HeroImageProps {
  monthName: string;
  year: string;
}

const HeroImage = ({ monthName, year }: HeroImageProps) => {
  return (
    <div className="hero-container">
      <div className="hero-bg-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="hero-gradient-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-year">{year}</div>
        <div className="hero-month">{monthName.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default HeroImage;
