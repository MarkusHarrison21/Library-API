import React, { Component } from 'react';
import Book from "./Book"
// import Spiner from './Spiner';
class Shelf extends Component {
    constructor(props){
        super(props)
        this.state={
            books:[],
            searchInput:"",
            filter:"",
            loading:true,
            search:false
  }
    }
handleInputChange=(e)=>{
    this.setState({searchInput:e.target.value})
}
clear=()=>{
    this.setState({searchInput:"",filter:""})
}
filters=()=>{
   this.setState({search:true});
   let url="";
   const title=this.state.searchInput.replace(/\s/g, '+');
   const filter=this.state.filter.replace(/\s/g, '+');
   if(title!="" && filter!="")
       {  url=`http://openlibrary.org/search.json?title=${title}&author=${filter}`
}
    else if(title =="" && filter!="")
        {  url=`http://openlibrary.org/search.json?author=${filter}`}
    else if(title!="" && filter=="")
{            url=`http://openlibrary.org/search.json?title=${title}`
    //    alert(url+"   "+"http://openlibrary.org/search.json?author=Victoria+Aveyard&title=red+queen")
}
alert(title)
alert(filter)
alert(url)
    return url
}
 HandleSearch=()=>{
    var url=this.filters()
     fetch(url)
      .then(async response => {
          const data = await response.json();
       // check for error response
       if (!response.ok) {alert(response)
           // get error message from body or default to response statusText
           const error = (data && data.message) || response.statusText;
           return Promise.reject(error);
       }
       this.setState({ books: data.docs,loading:false}); alert(data)
   })
   .catch(error => {
       this.setState({ errorMessage: error.toString() });
       console.error('There was an error!', error);
   });
}
handleFilterChange=(e)=>{
    const text=e.target.value
     this.setState({filter:text})
 }     
    render() {
        return (
            < div className=" text-center ">
                <nav className="navbar navbar-dark align-left">
                <div className="brand">
                   <img src="https://www.vhv.rs/dpng/d/593-5939450_library-icon-library-icon-transparent-background-hd-png.png" alt = "library icon" style = {{borderRadius:"50%",height: 100, width: 150, resizeMode : 'stretch',float:'left'}} />
                   {/* <h1 style={{color:"white"}} className="brand mx-4 my-4">I love Aaya</h1> */}
                </div>
                 </nav>
          <section className="jumbotron text-center">
             <div className="container align-middle ">
               <form className="form-inline mx-4">
                    <div className="form-group mx-4 ">
                        <label className="mx-2">Author Name</label>
                         <input value={this.state.filter} onChange={this.handleFilterChange}/> 
                    </div>
                    <div className="form-group">
                        <label className="mx-2">Title</label>
                         <input value={this.state.searchInput} onChange={this.handleInputChange}/> 
                    </div>
                    <button  className="btn btn-warning mx-2" onClick={this.HandleSearch} onMouseDown={this.HandleSearch}>Search</button>
                    <button  className="btn btn-danger " onClick={this.clear}>Clear</button>
                  </form>
               </div>
          </section>
  {/* {this.state.loading && this.state.search?( <Spiner></Spiner>) : (     */}
      <div className=" container ">
           <div className="row">
       {this.state.books.map((book)=>  <div><Book  key={book.key}  title={book.title} author={book['author_name']}  firstLine={book['first_sentence']}src={`http://covers.openlibrary.org/b/olid/${book['cover_edition_key']}-L.jpg`} /> <a href={`https://openlibrary.org/books/${book['cover_edition_key']}/${book.title.replace(/\s/g, '_')}`} target="blank">Preview...</a></div>)}
        </div> 
</div>
  {/* ) }   */}
            <footer className="text-muted fixed-bottom text-center  py-2 footer">
                <div className="container">
                  <p >
                   <a href="#root">Back to top</a>
                 </p>
             </div>
            </footer>
            </div>
        );
    }
}
export default Shelf;