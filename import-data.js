require('dotenv').config()

const mongoose = require('mongoose')

const filmingLocations = require("../secure-web-dev-workshop1/lieux-de-tournage-a-paris.json")

async function main(){
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected !')

  const { Schema } = mongoose;
  
  const filmSchema = new Schema({
      filmType: String,
      filmProducerName: String,
      endDate: Date,
      filmName: String,
      district: Number,
      geolocation: {
        coordinates: [Number],
        type: String
      },
      sourceLocationId: String,
      filmDirectorName: String,
      address: String,
      startDate: Date,
      year: Number,
  });
  
  const Location = mongoose.model("Location",filmSchema)
  //const maPremiereLocation = new Location ({filmType:'Horror'})
  //await maPremiereLocation.save()

  importFilm(filmingLocations)


  function importFilm(filmArrays){
    filmArrays.forEach( async function(element){
      let film = new Location()
      film.filmType = element.fields.type_tournage
      film.filmProducerName = element.fields.nom_producteur
      film.endDate = element.fields.date_fin
      film.filmName = element.fields.nom_tournage
      film.district = element.fields.ardt_lieu
      film.coordinates = element.fields.geo_shape['coordinates']
      film.type = element.fields.geo_shape['type']
      film.sourceLocationId = element.fields.id_lieu
      film.filmDirectorName = element.fields.nom_realisateur
      film.address = element.fields.addresse_lieu
      film.startDate = element.fields.date_debut
      film.year = element.fields.annee_tournage
      await film.save()
    })
    console.log("All fims are imported.")
  }
}

main()


