const ContentBlock = ({ title, description, items }) => (
    <div className="content-block">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
  
  const WhyChooseUs = () => {
    const contentBlocks = [
      {
        title: "Expertise",
        description: "Our team consists of industry veterans with decades of combined experience.",
        items: [
          "Specialized knowledge in various tech domains",
          "Continuous learning and skill development",
          "Proven track record of successful projects",
        ],
      },
      {
        title: "Client-Centric Approach",
        description: "We prioritize your needs and tailor our solutions to your specific requirements.",
        items: [
          "Personalized consultation and support",
          "Flexible and scalable solutions",
          "Transparent communication throughout the process",
        ],
      },
      {
        title: "Innovation",
        description: "We stay at the forefront of technological advancements to deliver cutting-edge solutions.",
        items: [
          "Research and development initiatives",
          "Early adoption of emerging technologies",
          "Continuous improvement of our methodologies",
        ],
      },
    ]
  
    return (
      <section className="why-choose-us">
        <h2 className="contentalign">Why Choose Us</h2>
        <div className="section-content">
          {contentBlocks.map((block, index) => (
            <ContentBlock key={index} {...block} />
          ))}
        </div>
      </section>
    )
  }
  
  export default WhyChooseUs
  
  