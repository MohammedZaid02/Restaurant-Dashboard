import React, { Component } from 'react';
import './App2.css';

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      dishId: '',
      dishName: '',
      imageUrl: '',
      isPublished: '',
      showForm: false, 
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTogglePublish = this.handleTogglePublish.bind(this);
    this.toggleForm = this.toggleForm.bind(this); 
  }

  componentDidMount() {
    this.callApi();
  }

  callApi() {
    fetch("http://localhost:3001/allDishes")
      .then(res => res.json())
      .then(data => this.setState({ dishes: data }))
      .catch(err => console.error("Failed to fetch data", err));
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dishId, dishName, imageUrl, isPublished } = this.state;

    const dish = {
      dishId,
      dishName,
      imageUrl,
      isPublished
    };

    fetch("http://localhost:3001/allDishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dish)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Dish added successfully", data);
        this.callApi(); 
        this.setState({ showForm: false }); 
      })
      .catch(err => console.error("Failed to add dish", err));
  }

  handleTogglePublish(dishId) {
    const { dishes } = this.state;
    const updatedDishes = dishes.map(dish => {
      if (dish._id === dishId) {
        const newPublishStatus = !dish.isPublished;

        dish.isPublished = newPublishStatus;

        fetch(`http://localhost:3001/allDishes/${dish._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ isPublished: newPublishStatus })
        })
          .then(res => res.json())
          .then(updatedDish => {
            console.log("Dish updated successfully", updatedDish);
          })
          .catch(err => {
            console.error("Failed to update dish", err);
            this.callApi(); 
          });
      }
      return dish;
    });

    this.setState({ dishes: updatedDishes });
  }

  toggleForm() {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  }

  render() {
    const { dishes, showForm } = this.state;

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={this.toggleForm}>Add New Dishes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href='/allDishes'>All Dishes</a>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>

        {showForm && (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="dishId">Dish ID:</label>
                <input
                  type="text"
                  id="dishId"
                  name="dishId"
                  value={this.state.dishId}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dishName">Dish Name:</label>
                <input
                  type="text"
                  id="dishName"
                  name="dishName"
                  value={this.state.dishName}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={this.state.imageUrl}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="isPublished">Published:</label>
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={this.state.isPublished}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        <div className="container">
        { /*<h1>Restaurant Dish Management</h1>*/ }
          <h2>Dish List</h2>
          <ul className="dish-list">
            {dishes.map(dish => (
              <li key={dish._id}>
                <div className="dish-info">
                  <img src={dish.imageUrl} alt={dish.dishName} />
                  <span>{dish.dishName}</span>
                </div>
                <button
                  className={dish.isPublished ? "published" : "unpublished"}
                  onClick={() => this.handleTogglePublish(dish._id)}
                >
                  {dish.isPublished ? "Unpublish" : "Publish"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App2;
