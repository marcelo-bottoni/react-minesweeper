<div id="top"></div>

<!-- PROJECT INTRO -->
<br />
<div align="center">
  <h3 align="center">React Minesweeper</h3>

  <p align="center">
    The good old Minesweeper, but coded in ReactJS and with a declarative UI!
    <br />
    <a href="https://react-minesweeper-demo.vercel.app" target="_blank"><strong>Check the Demo</strong></a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#using-the-component">Using the Component</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

React Minesweeper is a small hobby project that I've created to put in practice a new way to create interfaces for WEB applications.

The game component was entirely created with a declarative UI.
That means, we have not a single CSS file in use.

Also, no image file was used to create the UI.
What you might think is an image, is basically an emoticon.

I made use of **Chakra UI** to create the interface.
And the rest of the code is simply **Typescript**.

Feel free to fork the project and use it as you will.
Just mention me somewhere :D



<!-- BUILT WITH -->
### Built With

The only dependency in this project is the **Chakra UI**, that is used to create the UI.

* [Chakra UI](https://chakra-ui.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Running your own "React Minesweeper" project is very simple!

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/marcelo-bottoni/react-minesweeper
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Run the application
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USING THE COMPONENT -->
## Using the Component

The "React Minesweeper" project provides one component called "Minesweeper" that you can add anywhere and have the game up and running! Check the code below. It adds the game to a ReactJS page.

```react.js
  import { Minesweeper } from './components/Minesweeper';

  export function SamplePage ()
  {
    return (
      <div>

        <Minesweeper size={{rows: 9, columns: 9}} bombs={10}/>

      </div>
    );
  }
```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Marcelo F Bottoni - [@marcelo-bottoni](https://www.linkedin.com/in/marcelo-bottoni) - marcelo.bottoni.85@gmail.com

Project Link: [https://github.com/marcelo-bottoni/react-minesweeper](https://github.com/marcelo-bottoni/react-minesweeper)

<p align="right">(<a href="#top">back to top</a>)</p>
