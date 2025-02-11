import { CharacterDetails } from '../../../interfaces/characterDetails';

export class CharacterDetailsBuilder {
  private readonly details: CharacterDetails;

  constructor() {
    this.details = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: ['https://swapi.dev/api/vehicles/1/'],
      starships: ['https://swapi.dev/api/starships/1/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
  }

  setName(name: string): this {
    this.details.name = name;
    return this;
  }

  setHeight(height: string): this {
    this.details.height = height;
    return this;
  }

  setMass(mass: string): this {
    this.details.mass = mass;
    return this;
  }

  setHairColor(hairColor: string): this {
    this.details.hair_color = hairColor;
    return this;
  }

  setSkinColor(skinColor: string): this {
    this.details.skin_color = skinColor;
    return this;
  }

  setEyeColor(eyeColor: string): this {
    this.details.eye_color = eyeColor;
    return this;
  }

  setBirthYear(birthYear: string): this {
    this.details.birth_year = birthYear;
    return this;
  }

  setGender(gender: string): this {
    this.details.gender = gender;
    return this;
  }

  setHomeworld(homeworld: string): this {
    this.details.homeworld = homeworld;
    return this;
  }

  setFilms(films: string[]): this {
    this.details.films = films;
    return this;
  }

  setSpecies(species: string[]): this {
    this.details.species = species;
    return this;
  }

  setVehicles(vehicles: string[]): this {
    this.details.vehicles = vehicles;
    return this;
  }

  setStarships(starships: string[]): this {
    this.details.starships = starships;
    return this;
  }

  setCreated(created: string): this {
    this.details.created = created;
    return this;
  }

  setEdited(edited: string): this {
    this.details.edited = edited;
    return this;
  }

  setUrl(url: string): this {
    this.details.url = url;
    return this;
  }

  build(): CharacterDetails {
    return this.details;
  }
}
