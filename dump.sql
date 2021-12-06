--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: song; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "youtubeLink" character varying(255) NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.song OWNER TO postgres;

--
-- Name: song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.song_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.song_id_seq OWNER TO postgres;

--
-- Name: song_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.song_id_seq OWNED BY public.song.id;


--
-- Name: song id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song ALTER COLUMN id SET DEFAULT nextval('public.song_id_seq'::regclass);


--
-- Data for Name: song; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.song (id, name, "youtubeLink", score) FROM stdin;
\.


--
-- Name: song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.song_id_seq', 1, false);


--
-- Name: song song_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_name_key UNIQUE (name);


--
-- Name: song song_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_pk PRIMARY KEY (id);


--
-- Name: song song_youtubeLink_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song
    ADD CONSTRAINT "song_youtubeLink_key" UNIQUE ("youtubeLink");


--
-- PostgreSQL database dump complete
--