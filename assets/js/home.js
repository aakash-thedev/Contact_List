var favouriteList = document.getElementsByClassName('list_favourite');

var favouritesList = [];

function SwitchFavourites(contact, id) {

    if(favouritesList.includes(id)){

        contact.style.color = "blue";
        
        for(let i=0; i<favouritesList.length; i++){
            if(favouritesList[i] == id){
                favouritesList.splice(i, 1);
                return;
            }
        }
    }

    else{
        favouritesList.push(id);
        contact.style.color = 'red';
    }

    return;
}

for(let i=0; i<favouriteList.length; i++){

    favouriteList[i].addEventListener('click', function(){

        SwitchFavourites(favouriteList[i], i);

    });
}