CREATE TABLE IF NOT EXISTS "books" (
  "id" SERIAL PRIMARY KEY,
  "title" text UNIQUE NOT NULL,
  "isbn" varchar(13) UNIQUE,
  "goodreads_books_id" int,
  "calibre_books_id" int,
  "kindle_annotations_id" int,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

 alter table books add column created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();  

-- ALTER TABLE "users_books" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
-- ALTER TABLE "users_books" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;

-- GOODREADS TABLES

CREATE TABLE IF NOT EXISTS "goodreads_books" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "isbn13" varchar(13),
  "kindle_asin" varchar,
  "marketplace_id" varchar,
  "image_url" varchar,
  "language_code" varchar(3),
  "publisher" varchar,
  "publication_year" varchar(4),
  "publication_month" varchar(2),
  "publication_day" varchar(2),
  "is_ebook" bool,
  "description" text,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "goodreads_authors" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "role" text,
  "image_url" text,
  "small_image_url" text,
  "link" text
);

CREATE TABLE IF NOT EXISTS "goodreads_books_authors" (
  "book_id" int NOT NULL REFERENCES "goodreads_authors"("id") ON DELETE CASCADE,
  "author_id" int NOT NULL REFERENCES "goodreads_books"("id") ON DELETE CASCADE
);


ALTER TABLE "books" ADD FOREIGN KEY ("goodreads_books_id") REFERENCES "goodreads_books" ("id");

-- CALIBRE TABLES

CREATE TABLE IF NOT EXISTS "calibre_authors" (
  "id" SERIAL PRIMARY KEY,
  "author" text UNIQUE,
  "author_sort" text
);

CREATE TABLE IF NOT EXISTS "calibre_authors_books" (
  "author_id" int NOT NULL,
  "book_id" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "calibre_books" (
  "id" SERIAL PRIMARY KEY,
  "isbn" text UNIQUE,
  "amazon" text,
  "title" text,
  "title_sort" text,
  "publisher" text,
  "pubdate" date,
  "comments" text,
  "cover" bool,
  "series" text,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

ALTER TABLE "books" ADD FOREIGN KEY ("calibre_books_id") REFERENCES "calibre_books" ("id");

-- ANNOTATIONS TABLES

CREATE TABLE IF NOT EXISTS "kindle_annotations" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int UNIQUE,
  "book_id" int,
  "bookline" text,
  "title" text,
  "author" text,
  "language" varchar(3),
  "begin" int,
  "end" int,
  "time" timestamp,
  "highlight" text,
  "note" text,
  "statusline" text,
  "page" text,
  "ordernr" int,
  "edited_at" TIMESTAMP WITH TIMEZONE,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

ALTER TABLE "kindle_annotations" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");


-- Tags to Annotations

CREATE TABLE IF NOT EXISTS "annotations_tags" (
  "annotation_id" int NOT NULL,
  "tag_id" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "tags" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int UNIQUE,
  "tag" text NOT NULL,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

ALTER TABLE "annotations_tags" ADD FOREIGN KEY ("tag_id")
  REFERENCES "tags" ("id") ON DELETE CASCADE;

ALTER TABLE "annotations_tags" ADD CONSTRAINT annotation_id_tag_id_key
  UNIQUE(annotation_id, tag_id);

-- USERS TABLES

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "created_at" TIMESTAMP WITH TIMEZONE DEFAULT NOW(),
  "edited_at" TIMESTAMP WITH TIMEZONE
);

CREATE TABLE IF NOT EXISTS "users_books" (
  "user_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "book_id" int NOT NULL REFERENCES "books" ("id") ON DELETE CASCADE
);

CREATE INDEX users_email on users (email);



-- ALTER TABLE "calibre_authors_books" ADD PRIMARY KEY ("author_id", "book_id");
