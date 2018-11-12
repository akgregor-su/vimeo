/* eact.render(
    <div>Testing...</div>,
    document.getElementById("tree")
); */


const { Component } = React;
const { render } = ReactDOM;

const carouselContainer = document.querySelector(".carousel-container");

// Data for carousel
const carouselSlidesData = [
  {
    tite: "Vice Versa",
    content:
      "Come along with the Good Company crew as they travel throughout the US, Japan, BC and Quebec to showcase skiing in the best way possible."
  }, {
    title: "Hunt for the Wilderpeople",
    content:
      "Raised on hip-hop and foster care, defiant city kidRicky ges a fresh start in the New Zelan countryside. From the director of What We Do In The Shadows."
  }, {
    title: "Nichts passiert / A Decent Man",
    content:
      "A SWiss family takes a ski vacation and runs into trouble when the father, the titular decent man, fins himself in a series of moral quandaries."
  }, {
    title: "The Fourth Phase",
    content:
      "From the creators of the Art of FLIGHT, Red Bull Media House presents THE FOURTH PHASE, a snowboarding epic starring iconic athelete Travis Rice."
  }, {
    title: "Full Moon",
    content:
      "Be inspired by women who push boundaires. FULL MOON showcases the legends, current icons and future prodigies of this ever-evolving lifestyle sport."
  }
];

// Component for left arrow
class CarouselLeftArrow extends Component {
  render() {
    return (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--left"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>
    );
  }
}

// Component for right arrow
class CarouselRightArrow extends Component {
  render() {
    return (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--right"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-right" />
      </a>
    );
  }
}

// Component for carousel indicator
class CarouselIndicator extends Component {
  render() {
    return (
      <li>
        <a
          className={
            this.props.index == this.props.activeIndex
              ? "carousel__indicator carousel__indicator--active"
              : "carousel__indicator"
          }
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

// Component for slide
class CarouselSlide extends Component {
  render() {
    return (
      <li
        className={
          this.props.index == this.props.activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }
      >
        <p className="carousel-slide__content">{this.props.slide.content}</p>

        <p>
          <strong className="carousel-slide__author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="carousel-slide__source">
            {this.props.slide.source}
          </small>
        </p>
      </li>
    );
  }
}

// Carousel component
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  render() {
    return (
      <div className="carousel">
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

        <ul className="carousel__slides">
          {this.props.slides.map((slide, index) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
            />
          )}
        </ul>

        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}

// Render Carousel component
render(<Carousel slides={carouselSlidesData} />, carouselContainer);
Closing thoughts on cr