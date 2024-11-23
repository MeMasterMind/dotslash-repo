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
  
  const WhatWeDo = () => {
    const contentBlocks = [
      {
        title: "Innovative Solutions",
        description: "We develop cutting-edge technologies to solve complex business challenges.",
        items: [
          "Custom software development",
          "Cloud-based applications",
          "AI and machine learning integration",
        ],
      },
      {
        title: "Digital Transformation",
        description: "We help businesses adapt and thrive in the digital age.",
        items: [
          "Legacy system modernization",
          "Process automation",
          "Data-driven decision making",
        ],
      },
      {
        title: "Cybersecurity",
        description: "We protect your digital assets with state-of-the-art security measures.",
        items: [
          "Threat detection and prevention",
          "Compliance and risk management",
          "Security awareness training",
        ],
      },
    ]
  
    return (
      <section className="what-we-do">
        <h2 className="contentalign">What We Do</h2>
        <div className="section-content">
          {contentBlocks.map((block, index) => (
            <ContentBlock key={index} {...block} />
          ))}
        </div>
      </section>
    )
  }
  
  export default WhatWeDo
  
  