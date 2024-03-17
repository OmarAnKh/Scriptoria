
import "./DiscoverTab.css"



const Tab = () => {
    return (
      <section className="tab-home">
        <ul class="nav nav-tabs">
              <li class="nav-item">
          <a class="first-tab tab-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Genre</a>
        </li>
        <li class="nav-item">
          <a class="tab-item nav-link active" aria-current="page" href="#">All Genre</a>
        </li>
        <li class="nav-item">
          <a class="tab-item nav-link" href="#">Action</a>
        </li>
        <li class="nav-item">
          <a class="tab-item nav-link" href="#">Horror</a>
        </li>
        <li class="nav-item">
          <a class="tab-item nav-link" href="#">Romance</a>
        </li>
      
      </ul>
      </section>
    ); 
};
    export default Tab ;