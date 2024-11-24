import { Rocket, Shield, BarChart2, Users } from 'lucide-react'

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)

const Features = () => {
  const features = [
    { icon: <Rocket size={48} />, title: "Fast Performance", description: "Lightning-quick load times for optimal user experience." },
    { icon: <Shield size={48} />, title: "Secure Platform", description: "State-of-the-art security measures to protect your data." },
    { icon: <BarChart2 size={48} />, title: "Advanced Analytics", description: "Gain valuable insights with our powerful analytics tools." },
    { icon: <Users size={48} />, title: "24/7 Support", description: "Our dedicated team is always here to assist you." },
  ]

  return (
    <section id="what" className="features">
      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}

export default Features

    