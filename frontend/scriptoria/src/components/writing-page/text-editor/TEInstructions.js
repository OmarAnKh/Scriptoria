import React from "react";

const TEInstructions = () => {
  return (
    <section className="container wpi mt-5">
      <h1 className="mb-0">
        Welcome to <span className="Scriptoria fs-1">Scriptoria</span>
      </h1>
      <div className="instructions py-2">
        <h6>
          use <span className="fw-bold fs-"> &mdash;</span> to add a new slide
        </h6>
        <h6>
          Note: If you're adding an image and want to display it as a slide,
          please insert a horizontal line before and after the image by pressing
          the <span className="fw-bold fs-4"> &mdash;</span> button.
        </h6>
        <h6>
          Note: if you want your story to be presented as a whole, without
          slides, you don't have to do anything. However, please remember that
          the <span className="fw-bold fs-4"> &mdash;</span> button is used to
          separate slides.
        </h6>
      </div>
      
    </section>
  );
};

export default TEInstructions;
