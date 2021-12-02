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
-- Name: recommendation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendation (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.recommendation OWNER TO postgres;

--
-- Name: recommendation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendation_id_seq OWNER TO postgres;

--
-- Name: recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendation_id_seq OWNED BY public.recommendation.id;


--
-- Name: recommendation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation ALTER COLUMN id SET DEFAULT nextval('public.recommendation_id_seq'::regclass);


--
-- Data for Name: recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendation (id, name, link, score) FROM stdin;
\.


--
-- Name: recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendation_id_seq', 1, false);


--
-- Name: recommendation recommendation_link_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT recommendation_link_key UNIQUE (link);


--
-- Name: recommendation recommendation_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT recommendation_name_key UNIQUE (name);


--
-- Name: recommendation recommendation_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendation
    ADD CONSTRAINT recommendation_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
