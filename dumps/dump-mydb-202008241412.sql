PGDMP                         x            mydb    12.4    12.2     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16393    mydb    DATABASE     �   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE mydb;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1255    16445 ,   divide_price_if_rented_time_higher_than_20()    FUNCTION     �   CREATE FUNCTION public.divide_price_if_rented_time_higher_than_20() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		if new.rented_time > 20
		then new.price = old.price / 2 ;
		end if;
	return new;
	END;
$$;
 C   DROP FUNCTION public.divide_price_if_rented_time_higher_than_20();
       public          postgres    false    3            �            1259    16421    bikes    TABLE     '  CREATE TABLE public.bikes (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    type smallint NOT NULL,
    price numeric NOT NULL,
    rented_date timestamp without time zone,
    rented_time double precision DEFAULT 0 NOT NULL,
    is_rented boolean DEFAULT false NOT NULL
);
    DROP TABLE public.bikes;
       public         heap    postgres    false    3            �            1259    16419    bikes_id_seq    SEQUENCE     u   CREATE SEQUENCE public.bikes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.bikes_id_seq;
       public          postgres    false    3    203                       0    0    bikes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.bikes_id_seq OWNED BY public.bikes.id;
          public          postgres    false    202            �
           2604    16424    bikes id    DEFAULT     d   ALTER TABLE ONLY public.bikes ALTER COLUMN id SET DEFAULT nextval('public.bikes_id_seq'::regclass);
 7   ALTER TABLE public.bikes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    16421    bikes 
   TABLE DATA           [   COPY public.bikes (id, name, type, price, rented_date, rented_time, is_rented) FROM stdin;
    public          postgres    false    203                       0    0    bikes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.bikes_id_seq', 78, true);
          public          postgres    false    202            �
           2606    16429    bikes bikes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.bikes
    ADD CONSTRAINT bikes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.bikes DROP CONSTRAINT bikes_pkey;
       public            postgres    false    203            �
           2620    16448    bikes on_rent_time_update    TRIGGER     �   CREATE TRIGGER on_rent_time_update BEFORE UPDATE ON public.bikes FOR EACH ROW WHEN (((old.rented_time <= (20)::double precision) AND (new.rented_time > (20)::double precision))) EXECUTE FUNCTION public.divide_price_if_rented_time_higher_than_20();
 2   DROP TRIGGER on_rent_time_update ON public.bikes;
       public          postgres    false    204    203    203                  x������ � �          	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16393    mydb    DATABASE     �   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE mydb;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1255    16445 ,   divide_price_if_rented_time_higher_than_20()    FUNCTION     �   CREATE FUNCTION public.divide_price_if_rented_time_higher_than_20() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		if new.rented_time > 20
		then new.price = old.price / 2 ;
		end if;
	return new;
	END;
$$;
 C   DROP FUNCTION public.divide_price_if_rented_time_higher_than_20();
       public          postgres    false    3            �            1259    16421    bikes    TABLE     '  CREATE TABLE public.bikes (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    type smallint NOT NULL,
    price numeric NOT NULL,
    rented_date timestamp without time zone,
    rented_time double precision DEFAULT 0 NOT NULL,
    is_rented boolean DEFAULT false NOT NULL
);
    DROP TABLE public.bikes;
       public         heap    postgres    false    3            �            1259    16419    bikes_id_seq    SEQUENCE     u   CREATE SEQUENCE public.bikes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.bikes_id_seq;
       public          postgres    false    3    203                       0    0    bikes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.bikes_id_seq OWNED BY public.bikes.id;
          public          postgres    false    202            �
           2604    16424    bikes id    DEFAULT     d   ALTER TABLE ONLY public.bikes ALTER COLUMN id SET DEFAULT nextval('public.bikes_id_seq'::regclass);
 7   ALTER TABLE public.bikes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    16421    bikes 
   TABLE DATA           [   COPY public.bikes (id, name, type, price, rented_date, rented_time, is_rented) FROM stdin;
    public          postgres    false    203                       0    0    bikes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.bikes_id_seq', 78, true);
          public          postgres    false    202            �
           2606    16429    bikes bikes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.bikes
    ADD CONSTRAINT bikes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.bikes DROP CONSTRAINT bikes_pkey;
       public            postgres    false    203            �
           2620    16448    bikes on_rent_time_update    TRIGGER     �   CREATE TRIGGER on_rent_time_update BEFORE UPDATE ON public.bikes FOR EACH ROW WHEN (((old.rented_time <= (20)::double precision) AND (new.rented_time > (20)::double precision))) EXECUTE FUNCTION public.divide_price_if_rented_time_higher_than_20();
 2   DROP TRIGGER on_rent_time_update ON public.bikes;
       public          postgres    false    204    203    203           