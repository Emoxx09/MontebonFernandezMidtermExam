const express = require ("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/MontebonFernandez2.1.1", async (req,res) =>{
    try{
        const q1 = `SELECT COUNT (*) FROM film;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.1.2", async (req,res) =>{
    try{
        const q1 = `SELECT rating, SUM(film.length) FROM film GROUP BY rating;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.1.3", async (req,res) =>{
    try{
        const q1 = `SELECT * FROM film WHERE replacement_cost = (SELECT MAX (replacement_cost) FROM film);`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.2.1.1", async (req,res) =>{
    try{
        const q1 = `CREATE VIEW midterm_list_of_films AS SELECT f.film_id AS "fid", f.title, x.name AS "category", rental_rate AS "price", rating, STRING_AGG (a.first_name || ' ' || a.last_name, ',') actors FROM film f INNER JOIN film_category c ON f.film_id = c.film_id INNER JOIN public.category x ON c.category_id = x.category_id INNER JOIN film_actor b ON f.film_id = b.film_id INNER JOIN actor a ON b.actor_id = a.actor_id GROUP BY f.film_id, x.name;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.2.1.2", async (req,res) =>{
    try{
        const q1 = `select * from midterm_list_of_films;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.2.2.1", async (req,res) =>{
    try{
        const q1 = `CREATE VIEW midterm_total_films_per_category AS SELECT x.name, COUNT(*) FROM film f INNER JOIN film_category c ON f.film_id = c.film_id INNER JOIN public.category x ON c.category_id = x.category_id GROUP BY x.category_id;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.2.2.2", async (req,res) =>{
    try{
        const q1 = `select * from film;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.3.1.1", async (req,res) =>{
    try{
        const q1 = `CREATE VIEW johnny_lollobrigida_film AS SELECT f.title FROM film f INNER JOIN film_actor b ON f.film_id = b.film_id INNER JOIN actor a ON b.actor_id = a.actor_id WHERE b.actor_id = 5;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.3.1.2", async (req,res) =>{
    try{
        const q1 = `CREATE VIEW whoopi_hurt_film AS SELECT f.title FROM film f INNER JOIN film_actor b ON f.film_id = b.film_id INNER JOIN actor a ON b.actor_id = a.actor_id WHERE b.actor_id = 140;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.3.1.3", async (req,res) =>{
    try{
        const q1 = `SELECT * FROM johnny_lollobrigida_film INTERSECT SELECT * FROM whoopi_hurt_film;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get("/MontebonFernandez2.3.2", async (req,res) =>{
    try{
        const q1 = `SELECT f.film_id, title, x.name FROM film f INNER JOIN film_category c ON c.film_id = c.film_id INNER JOIN public.category x ON c.category_id = x.category_id WHERE x.name = 'Children' GROUP BY f.film_id, x.name;`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.4.1", async (req,res) =>{
    try{
        const q1 = `CREATE OR REPLACE FUNCTION get_film_rating(title_x varchar) RETURNS mpaa_rating LANGUAGE plpgsql as $$ DECLARE rating mpaa_rating; BEGIN select f.rating into rating from film f where title_x = f.title; return rating; END; $$`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.post("/MontebonFernandez2.4.2", async (req,res) =>{
    try{
        const q1 = `CREATE OR REPLACE FUNCTION get_film_release_year(title_x varchar) RETURNS int LANGUAGE plpgsql as $$ DECLARE release_year int; BEGIN select f.release_year into release_year from film f where title_x = f.title; return release_year; END; $$`;
        const query1 = await pool.query(q1);
        res.json(query1);
    }
    catch(err){
        console.error(err.message);
    }
});

app.listen (5001, ()=>{
    console.log("server has started on port 5001");
});