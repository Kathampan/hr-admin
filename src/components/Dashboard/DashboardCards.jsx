import React, { useEffect } from "react";

const DashboardCards = ({ cards }) => {
  useEffect(() => {
    const boxes = document.querySelectorAll(".fade-in");
    boxes.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
   

    <div className="container py-5 text-center">
    <h1 className="mb-4 fw-bold">Dashboard</h1>
    <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">
      {cards.map((card, idx) => (
        <div
          key={idx} className="box fade-in"
          
          onClick={() => (window.location.href = card.link)}
        >
          <div className="icon">{card.icon}</div>
          <h3>{card.title}</h3>
        </div>
      ))}
    </div>
  </div>
   
  );
};

export default DashboardCards;
