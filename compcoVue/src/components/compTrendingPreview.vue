<style scoped>

.competitionPreview2 {
    position: relative;
    margin-top: 30px;
    display: inline-block;
    background-color: white;
    /* height: 200px; */
    /* width: 230px; */
    width: calc(100%/4 - 20px);
    aspect-ratio: 3/2;
    margin-right: 20px;
    cursor: pointer;
    box-shadow: 2px 2px 4px 1px grey;
    border-radius: 10px;

}

.competitionPreview2:hover {
    box-shadow: 2px 2px 4px 2px var(--main-text-color);
}

.competitionPreviewName2 {
    
    position: absolute;
    /* float: left;
    margin-left: 10px; */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 19px;
    bottom: 5px;
    left: 10px;
    background-color: var(--main-text-color);
    color:var(--main-bg-color);

    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;

    border:solid 1px black;
    border-radius: 5px;
    transition: text-color 1s, background-color 1s;
}

.officialIcon{
    margin-bottom: -3px;
    height: 20px;
    width: 20px;
    background-color: var(--main-button-color);
    border-radius: 5px;
    margin-right: 5px;
    transition: background-color 1s;
}

.competitionPreviewLocation2 {
    display: none;

    float: left;
    margin-left: 10px;
    font-size: 20px;

}

.competitionPreviewViews2 {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-family: Montserrat-Medium;
    font-size: 13px;
    
    background-color: var(--main-text-color);
    color:var(--main-bg-color);
    
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    
    border:solid 1px black;
    border-radius: 5px;
    transition: text-color 1s, background-color 1s;
}

.competitionPreviewLikes2 {
    display: none;

    position: absolute;
    bottom: 5px;
    right: 20px;
    font-family: Montserrat-Medium;
    font-size:13px;
}

.competitionPreviewImage2 {
    position: absolute;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    background-size: contain;
}


@media only screen and (max-width: 1600px) {
    .exploreCategories {
        width: calc(100% - 80px);
        left: 40px;
        margin-bottom: 50px;
    }
    .competitionPreview2 {
        width: calc(100%/4 - 20px);
    }
    .exploreCompetitionsArea {
        width: calc(100% - 80px);
        margin-left: 40px;
    }

    
    .competitionPreviewAreaTop {
        width: 100%;
    }

    .exploreCommunitiesArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .exploreUsersArea {
        top:0px;
        position: relative;
        width: 400px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100%/4 - 20px)!important;
    }
}

@media only screen and (max-width: 1200px) {

    .exploreCategories {
        margin-bottom: 50px;
    }
    .exploreCompetitionsArea {
        margin-bottom: 50px;
    }

    .competitionPreview{
        width:calc(100%/3 - 20px)!important;
    }
}

@media only screen and (max-width: 950px) {
    
    .competitionPreview2 {
        width: calc(100%/2 - 20px);
        margin-right: 20px;
    }
    .competitionPreview{
        width:calc(100%/2 - 20px)!important;
    }
}

@media only screen and (max-width: 750px) {
    .exploreCategories {
        padding-bottom:100px;
    }
    .exploreCompetitionsArea {
        margin-top:280px;
    }
}


@media only screen and (max-width: 550px) {
    .exploreCategories {
        padding-bottom: 150px;
    }
    .exploreCompetitionsArea {
        margin-top: 320px;
    }

    .competitionPreview2 {
        width: 100%;
        margin-right: 20px;
    }
    .competitionPreview{
        width:100%!important;
    }
}

</style>