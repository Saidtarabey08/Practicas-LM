class Pokemon
{

    constructor(imagen,nombre,hp,experiencia,ataque,especial,defensa){
        this.imagen = imagen;
        this.nombre = nombre;
        this.hp = hp;
        this.experiencia = experiencia;
        this.ataque = ataque;
        this.especial = especial;
        this.defensa = defensa;
    }

 static getPokemon(num){
    return HTTP.ajax('GET', `https://pokeapi.co/api/v2/pokemon/` + `${num}`).then(
        data => {
        console.log(data)
        let poke_img = data.sprites.front_default;
        let poke_nombre = data.name;
        let poke_hp = data.stats[0].base_stat;
        let poke_experiencia = data.base_experience;
        let poke_ataque = data.stats[1].base_stat;
        let poke_especial = data.stats[3].base_stat;
        let poke_defensa = data.stats[2].base_stat;
        let poke = new Pokemon(poke_img, poke_nombre, poke_hp, poke_experiencia, poke_ataque, poke_especial, poke_defensa);
        console.log(poke)
        return poke;
        })
    }


pintarPokemon() {
    console.log('hola')
    const flex = document.querySelector('.flex')
    flex.querySelector('.card-body-img').setAttribute('src', this.imagen)
    flex.querySelector('.card-body-title').innerHTML = `${this.nombre} <span>${this.hp} hp</span>`
    flex.querySelector('.card-body-text').textContent = this.experiencia + ' Exp'
    flex.querySelectorAll('.card-footer-boxstats-stats h3')[0].textContent = this.ataque + 'K'
    flex.querySelectorAll('.card-footer-boxstats-stats h3')[1].textContent = this.especial + 'K'
    flex.querySelectorAll('.card-footer-boxstats-stats h3')[2].textContent = this.defensa + 'K'

    
}

}
/*
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    template.querySelector('.card-body-img').setAttribute('src', this.imagen)
    template.querySelector('.card-body-title').innerHTML = `${this.nombre} <span>${this.hp} hp</span>`
    template.querySelector('.card-body-text').textContent = this.experiencia + ' Exp'
    template.querySelectorAll('.card-footer-boxstats-stats h3')[0].textContent = this.ataque + 'K'
    template.querySelectorAll('.card-footer-boxstats-stats h3')[1].textContent = this.especial + 'K'
    template.querySelectorAll('.card-footer-boxstats-stats h3')[2].textContent = this.defensa + 'K'
    flex.appendChild(template)


console.log('hola')
const flex = document.querySelector('.flex')
const template = document.querySelector('#template-card').content
const fragment = document.createDocumentFragment()
template.querySelector('.card-body-img').setAttribute('src', this.img)
template.querySelector('.card-body-title').innerHTML = `${this.nombre} <span>${this.hp} hp</span>`
template.querySelector('.card-body-text').textContent = this.experiencia + ' Exp'
template.querySelectorAll('.card-footer-boxstats-stats h3')[0].textContent = this.ataque + 'K'
template.querySelectorAll('.card-footer-boxstats-stats h3')[1].textContent = this.especial + 'K'
template.querySelectorAll('.card-footer-boxstats-stats h3')[2].textContent = this.defensa + 'K'

fragment.appendChild(template)
flex.appendChild(fragment)*/