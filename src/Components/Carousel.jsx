import { Component } from 'react';

export default class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ['https://pets-images.dev-apis.com/pets/none.jpg'],
  };

  handleIndexClick = (e) => {
    this.setState({ active: +e.target.dataset.index });
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="Animal" />
        <div className="carousel-smaller">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              className={index == active ? 'active' : ''}
              alt="Animal-Thumpnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}
