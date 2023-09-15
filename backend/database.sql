-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: manageme
-- Generation Time: 2023-09-15 15:25:52.2960
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."account_type" (
    "account_type" varchar(25) NOT NULL,
    PRIMARY KEY ("account_type")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS delivery_list_list_item_id_seq;

-- Table Definition
CREATE TABLE "public"."delivery_list" (
    "list_item_id" int4 NOT NULL DEFAULT nextval('delivery_list_list_item_id_seq'::regclass),
    "delivery_id" int4 NOT NULL,
    "product_id" varchar(25) NOT NULL,
    "delivery_quantity" int4 NOT NULL,
    PRIMARY KEY ("list_item_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."monthly_store_usage" (
    "product_id" varchar(25) NOT NULL,
    "month_year" date NOT NULL,
    "total_order_quantity" int4 NOT NULL
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS product_inventory_inventory_id_seq;

-- Table Definition
CREATE TABLE "public"."product_inventory" (
    "inventory_id" int4 NOT NULL DEFAULT nextval('product_inventory_inventory_id_seq'::regclass),
    "product_id" varchar(25) NOT NULL,
    "product_description" varchar(255) NOT NULL,
    "unit_of_measurement" varchar(25) NOT NULL,
    "in_use" bool NOT NULL,
    "supplier" varchar(255) NOT NULL,
    "supplier_leadtime" int2 NOT NULL,
    "piece_per_uom" int2 NOT NULL,
    "cost_per_uom" numeric(6,2),
    PRIMARY KEY ("product_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS purchase_order_order_id_seq;

-- Table Definition
CREATE TABLE "public"."purchase_order" (
    "order_id" int4 NOT NULL DEFAULT nextval('purchase_order_order_id_seq'::regclass),
    "username" varchar(25) NOT NULL,
    "product_id" varchar(25) NOT NULL,
    "order_quantity" int4 NOT NULL,
    "order_placed_date" date NOT NULL,
    "estimated_receive_date" date,
    "received_date" date,
    "fulfilled" bool,
    "on_time" bool,
    PRIMARY KEY ("order_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS store_store_id_seq;

-- Table Definition
CREATE TABLE "public"."store" (
    "store_id" int4 NOT NULL DEFAULT nextval('store_store_id_seq'::regclass),
    "product_id" varchar(25) NOT NULL,
    "store_quantity" int4,
    PRIMARY KEY ("store_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS store_delivery_delivery_id_seq;

-- Table Definition
CREATE TABLE "public"."store_delivery" (
    "delivery_id" int4 NOT NULL DEFAULT nextval('store_delivery_delivery_id_seq'::regclass),
    "username" varchar(25) NOT NULL,
    "delivery_placed_date" date NOT NULL,
    "to_deliver_date" date,
    "delivered_date" date,
    "completed" bool,
    PRIMARY KEY ("delivery_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."unit_of_measurement" (
    "unit_of_measurement" varchar(25) NOT NULL,
    PRIMARY KEY ("unit_of_measurement")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_list" (
    "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "username" varchar(25) NOT NULL,
    "email" varchar(255) NOT NULL,
    "user_password" varchar(255) NOT NULL,
    "company" varchar(255) NOT NULL,
    "user_status" bool NOT NULL,
    "account_type" varchar(25) NOT NULL,
    PRIMARY KEY ("user_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS warehouse_warehouse_id_seq;

-- Table Definition
CREATE TABLE "public"."warehouse" (
    "warehouse_id" int4 NOT NULL DEFAULT nextval('warehouse_warehouse_id_seq'::regclass),
    "product_id" varchar(25) NOT NULL,
    "warehouse_quantity" int4,
    "warehouse_stocklevel" int4,
    PRIMARY KEY ("warehouse_id")
);

INSERT INTO "public"."account_type" ("account_type") VALUES
('Manager'),
('Staff');

INSERT INTO "public"."delivery_list" ("list_item_id", "delivery_id", "product_id", "delivery_quantity") VALUES
(1, 1, 'SQA0001', 10),
(2, 1, 'SQA0002', 10),
(3, 2, 'SQA0002', 10),
(4, 4, 'SQA0001', 100),
(5, 4, 'SQA0003', 50),
(6, 4, 'SQA0002', 15),
(7, 3, 'SQA0002', 825),
(8, 3, 'SQA0002', 7),
(9, 1, 'SQA0003', 10),
(12, 5, 'SQA0004', 10),
(13, 2, 'SQA0003', 10),
(19, 12, 'SQA0007', 20),
(20, 13, 'PROD321', 10),
(21, 16, 'SQA0001', 20),
(22, 16, 'SQA0002', 30),
(23, 17, 'PROD321', 20),
(24, 17, 'PROD123', 20),
(25, 17, 'PRODDIE', 30),
(26, 18, 'SQA0001', 10),
(27, 18, 'PRODDIE', 10),
(28, 18, 'PROD321', 10),
(33, 45, 'PRODUCT', 10),
(34, 46, 'PROD321', 2),
(35, 46, 'PROD123', 2),
(36, 47, 'PROD123', 2),
(37, 47, 'PROD321', 2),
(38, 48, 'PRODDIE', 321),
(39, 49, 'PRODUCT', 123),
(40, 50, 'PROD123', 1),
(41, 50, 'SQA0002', 5),
(42, 50, 'PROD321', 2),
(43, 50, 'SQA0001', 4),
(44, 50, 'PRODUCT', 3),
(45, 51, 'PRODDDD', 10),
(46, 52, 'SQA0001', 2),
(47, 53, 'SQA0001', 2),
(48, 53, 'SQA0002', 3),
(49, 54, 'SQA0001', 10),
(50, 55, 'SQA0001', 10),
(51, 57, 'SQA0001', 20),
(52, 57, 'SQA0005', 20),
(53, 57, 'SQA0003', 20),
(54, 57, 'SQA0002', 20),
(55, 57, 'SQA0004', 20),
(56, 57, 'SQA0006', 20),
(57, 58, 'SQA0001', 20),
(58, 58, 'SQA0002', 30),
(59, 59, 'SQA0007', 10),
(60, 60, 'SQA0001', 20),
(61, 60, 'SQA0002', 20),
(62, 61, 'SQA0008', 40);

INSERT INTO "public"."monthly_store_usage" ("product_id", "month_year", "total_order_quantity") VALUES
('SQA0001', '2023-01-01', 100),
('SQA0001', '2023-02-01', 110),
('SQA0002', '2023-01-01', 50),
('SQA0002', '2023-02-01', 70),
('SQA0001', '2023-03-01', 100),
('SQA0002', '2023-03-01', 100),
('SQA0003', '2022-01-01', 825),
('SQA0003', '2023-01-01', 825);

INSERT INTO "public"."product_inventory" ("inventory_id", "product_id", "product_description", "unit_of_measurement", "in_use", "supplier", "supplier_leadtime", "piece_per_uom", "cost_per_uom") VALUES
(14, 'PPPPROD', 'prododod', 'CTN', 't', 'prpoepor', 9, 7, 7.00),
(12, 'PROD123', 'test product 4', 'BOX', 't', 'test product 4', 825, 825, 8.25),
(13, 'PROD321', 'test product 5', 'EA', 't', 'test product 5', 10, 1, 19.90),
(10, 'PRODDDD', 'product test 2', 'EA', 'f', 'test product 2', 10, 1000, 999.00),
(11, 'PRODDIE', 'product test 3', 'CTN', 'f', 'test product 3', 14, 999, 10.99),
(9, 'PRODUCT', 'product test', 'BOX', 't', 'test product', 60, 400, 36.90),
(1, 'SQA0001', 'YCL Toothbrush', 'CTN', 't', 'Toothbrush Inc. Pte. Ltd.', 4, 250, 50.50),
(2, 'SQA0002', 'YCL Amenity Kit', 'CTN', 't', 'Rainbow Corporation Pte. Ltd.', 4, 200, 150.00),
(4, 'SQA0003', 'YCL paper cups', 'CTN', 't', 'Paper & Co Pte. Ltd.', 2, 1000, 45.69),
(5, 'SQA0004', 'YCL Soft Tissue', 'CTN', 't', 'Tissue Paper Company', 5, 1000, 70.69),
(6, 'SQA0005', 'YCL Paper Towels', 'CTN', 't', 'Tissue Paper Company', 5, 5000, 55.80),
(7, 'SQA0006', 'YCL Comb', 'CTN', 't', 'Comb & Co', 30, 1000, 35.00),
(8, 'SQA0007', 'YCL Shaving Kit', 'CTN', 't', 'Shave & Kit', 30, 1000, 35.00),
(15, 'SQA0008', 'vodka', 'EA', 't', 'junhou', 30, 1, 109.00);

INSERT INTO "public"."purchase_order" ("order_id", "username", "product_id", "order_quantity", "order_placed_date", "estimated_receive_date", "received_date", "fulfilled", "on_time") VALUES
(1, 'mochi1', 'SQA0001', 10, '2023-01-21', NULL, '2023-09-13', 't', 'f'),
(2, 'mochi1', 'SQA0001', 10, '2023-02-21', NULL, '2023-09-13', 't', 'f'),
(3, 'mochi1', 'SQA0001', 10, '2023-03-14', NULL, '2023-09-13', 't', 'f'),
(4, 'mochi1', 'SQA0003', 20, '2023-11-21', NULL, '2023-09-13', 't', 'f'),
(5, 'mochi1', 'SQA0002', 200, '2023-05-23', NULL, NULL, NULL, NULL),
(6, 'mochi1', 'SQA0003', 150, '2023-08-25', NULL, NULL, NULL, NULL),
(7, 'mochi1', 'SQA0002', 825, '2022-08-25', NULL, NULL, NULL, NULL),
(8, 'mochi1', 'SQA0002', 10, '2022-01-01', NULL, NULL, NULL, NULL),
(9, 'mochi1', 'SQA0003', 10, '2022-02-02', NULL, NULL, NULL, NULL),
(10, 'mochi1', 'SQA0003', 10, '2022-03-03', NULL, NULL, NULL, NULL),
(11, 'mochi1', 'SQA0003', 10, '2022-03-01', NULL, NULL, NULL, NULL),
(12, 'mochi1', 'SQA0003', 10, '2022-03-01', NULL, NULL, NULL, NULL),
(13, 'mochi1', 'SQA0003', 10, '2022-03-01', '2022-03-03', '2022-03-04', 't', 'f'),
(14, 'mochi1', 'SQA0003', 10, '2023-01-01', '2023-01-03', NULL, NULL, NULL),
(15, 'mochi1', 'SQA0003', 10, '2022-04-04', '2022-04-06', NULL, NULL, NULL),
(16, 'mochi1', 'SQA0007', 10, '2022-04-01', '2022-05-01', NULL, NULL, NULL),
(17, 'testUser', 'PROD321', 20, '2023-09-12', '2023-09-22', NULL, NULL, NULL),
(18, 'testUser', 'PROD123', 5, '2023-09-12', '2025-12-15', NULL, NULL, NULL),
(19, 'testUser', 'PROD123', 20, '2023-09-12', '2025-12-15', NULL, NULL, NULL),
(20, 'testUser', 'PROD321', 20, '2023-09-12', '2023-09-22', NULL, NULL, NULL),
(21, 'testUser', 'PRODDIE', 32, '2023-09-12', '2023-09-26', NULL, NULL, NULL),
(22, 'mochi1', 'SQA0003', 10, '2022-03-01', '2022-03-03', NULL, NULL, NULL),
(23, 'testUser', 'SQA0001', 10, '2023-09-12', '2023-09-16', NULL, NULL, NULL),
(24, 'testUser', 'SQA0001', 20, '2023-09-12', '2023-09-16', '2023-09-13', 't', 't'),
(25, 'testUser', 'SQA0008', 50, '2023-09-15', '2023-10-15', '2023-09-15', 't', 't'),
(26, 'testUser', 'SQA0008', 20, '2023-09-15', '2023-10-15', '2023-09-15', 't', 't');

INSERT INTO "public"."store" ("store_id", "product_id", "store_quantity") VALUES
(1, 'SQA0001', 124),
(2, 'SQA0002', 128),
(3, 'SQA0003', 70),
(4, 'SQA0005', 50),
(5, 'PROD321', 10),
(6, 'PROD123', 90),
(7, 'SQA0004', 100),
(8, 'SQA0008', 70);

INSERT INTO "public"."store_delivery" ("delivery_id", "username", "delivery_placed_date", "to_deliver_date", "delivered_date", "completed") VALUES
(1, 'mochi1', '2023-06-23', NULL, '2023-09-13', 't'),
(2, 'mandu1', '2023-06-30', NULL, '2023-09-13', 't'),
(3, 'mandu1', '2023-06-03', '2023-06-13', '2023-06-13', 't'),
(4, 'mochi1', '2023-09-03', '2023-09-05', '2023-09-13', 't'),
(5, 'mandu1', '2023-07-25', '2023-08-06', '2023-09-13', 't'),
(6, 'testUser', '2023-09-12', '2023-09-14', '2023-09-13', 't'),
(7, 'testUser', '2023-09-12', '2023-09-14', '2023-09-14', 't'),
(8, 'testUser', '2023-09-12', '2023-09-14', '2023-09-13', 't'),
(9, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(10, 'testUser', '2023-09-12', '2023-09-14', '2023-09-14', 't'),
(11, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(12, 'testUser', '2023-09-12', '2023-09-14', '2023-09-13', 't'),
(13, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(14, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(15, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(16, 'testUser', '2023-09-12', '2023-09-14', '2023-09-13', 't'),
(17, 'testUser', '2023-09-12', '2023-09-14', NULL, NULL),
(18, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(19, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(20, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(21, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(22, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(23, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(24, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(25, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(26, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(27, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(28, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(29, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(30, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(31, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(32, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(33, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(34, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(35, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(36, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(37, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(38, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(39, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(40, 'testUser', '2023-09-13', '2023-09-15', '2023-09-14', 't'),
(41, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(42, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(43, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(44, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(45, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(46, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(47, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(48, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(49, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(50, 'testUser', '2023-09-13', '2023-09-15', NULL, NULL),
(51, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(52, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(53, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(54, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(55, 'testUser', '2023-09-13', '2023-09-15', '2023-09-13', 't'),
(56, 'testUser', '2023-09-14', '2023-09-16', '2023-09-15', 't'),
(57, 'testUser', '2023-09-14', '2023-09-16', '2023-09-14', 't'),
(58, 'testUser2', '2023-09-14', '2023-09-16', '2023-09-14', 't'),
(59, 'testUser', '2023-09-15', '2023-09-17', '2023-09-15', 't'),
(60, 'testUser', '2023-09-15', '2023-09-17', '2023-09-15', 't'),
(61, 'testUser', '2023-09-15', '2023-09-17', '2023-09-15', 't');

INSERT INTO "public"."unit_of_measurement" ("unit_of_measurement") VALUES
('BOX'),
('CTN'),
('EA');

INSERT INTO "public"."user_list" ("user_id", "username", "email", "user_password", "company", "user_status", "account_type") VALUES
('247945f4-fdd9-4ceb-be4a-9b1041ab8c96', 'mochi4', 'mochi4@mochi.com', '$2b$12$FTfF0bQEfNlIro25h1qcBOKHxX3rXp5k64BaJF3j0JGoydeqNC7Lm', 'Mochi Pte. Ltd.', 't', 'Staff'),
('278bdcb8-1c82-4263-a0b5-f07d46384fcd', 'testUser1', 'user1@test.com', '$2b$12$FR1rspo7WKQ12pz3PMh/3e5VAQ38JwoVWOsKkxswX1Na5H4QC4I4m', 'Test User Pte. Ltd.', 't', 'Manager'),
('30b0532b-7442-47a6-82e6-3be3f286d4e4', 'mochi3', 'mochi3mochi.com', 'mochimochi2', 'Mochi Pte. Ltd.', 't', 'Manager'),
('38ff4a35-794c-4581-968f-cec3dbd98f4c', 'mandu1', 'mandu1@mandu.com', 'mandumandu', 'Mandu Pte. Ltd.', 't', 'Staff'),
('397d1a45-dd5f-4f54-91d1-ad7efc7d19dd', 'testUser', 'user@test.com', '$2b$12$kERDCdp749tAmEGE.BcEkOq0ZInjFsJFk/c2KV4AEGqDV.DEr6T.a', 'Test User Pte. Ltd.', 't', 'Manager'),
('4225cc6d-0f86-4461-b2e0-6a2c121b06f4', 'testUser2', 'user2@test.com', '$2b$12$BShm/sTDzdoIQ4s2mXwJEOxoeLYJZNU7BOAmc4d14f3/FzcqMEEdm', 'Test User Pte. Ltd.', 't', 'Staff'),
('814285d0-8fc7-4ad5-b337-5f06b616b605', 'jonjon', 'jon@jon.com', '$2b$12$BzQsGvPsgoE6TrWGj4/pkuvTlbFZjjCx3RlQn01XRDAymSdldZyQ.', 'father of 2', 't', 'Staff'),
('82bc4437-5fe5-453b-a969-1a75da607c0b', 'mochi1', 'mochi1@mochi.com', 'mochimochi', 'Mochi Pte. Ltd.', 't', 'Manager'),
('91e8c2a2-7b7e-4fb6-a705-5ae10d130938', 'mandu2', 'mandu2@mandu.com', 'mandumandu2', 'Mandu Pte. Ltd.', 't', 'Manager'),
('a9d78a4f-e662-4417-b06f-0b4cbb2cc08d', 'ttttt', 't@t.com', '$2b$12$i26Q6194r3pWVf6YOzLlvuKO1LtWru3hPli5iJDuaoW8ixbsqE.3S', 'T Pte. Ltd.', 't', 'Staff'),
('cc915f82-4542-44b2-b517-b192377e2ec9', 'testtest', 'test@test.com', '$2b$12$NvCCneXTnSyxMMs2p10kCea.YWjKHhOi4ylB/n5I2Zw6NYhJ1V8uq', 'test user pte ltd', 't', 'Staff'),
('e6b9feaf-fa5e-4162-a823-6ec76f13dc1f', 'mochi2', 'mochi2@mochi.com', 'mochimochi2', 'Mochi Pte. Ltd.', 'f', 'Manager');

INSERT INTO "public"."warehouse" ("warehouse_id", "product_id", "warehouse_quantity", "warehouse_stocklevel") VALUES
(1, 'SQA0001', 10, NULL),
(2, 'SQA0002', 130, 6),
(4, 'SQA0005', 100, NULL),
(5, 'SQA0003', 219, NULL),
(6, 'PROD321', 10, NULL),
(7, 'PROD123', 99, NULL),
(8, 'PRODDDD', 825, NULL),
(9, 'SQA0004', 100, NULL),
(10, 'SQA0008', 80, NULL);

ALTER TABLE "public"."delivery_list" ADD FOREIGN KEY ("product_id") REFERENCES "public"."product_inventory"("product_id");
ALTER TABLE "public"."delivery_list" ADD FOREIGN KEY ("delivery_id") REFERENCES "public"."store_delivery"("delivery_id");
ALTER TABLE "public"."product_inventory" ADD FOREIGN KEY ("unit_of_measurement") REFERENCES "public"."unit_of_measurement"("unit_of_measurement");
ALTER TABLE "public"."purchase_order" ADD FOREIGN KEY ("product_id") REFERENCES "public"."product_inventory"("product_id");
ALTER TABLE "public"."purchase_order" ADD FOREIGN KEY ("username") REFERENCES "public"."user_list"("username");
ALTER TABLE "public"."store_delivery" ADD FOREIGN KEY ("username") REFERENCES "public"."user_list"("username");
ALTER TABLE "public"."user_list" ADD FOREIGN KEY ("account_type") REFERENCES "public"."account_type"("account_type");
ALTER TABLE "public"."warehouse" ADD FOREIGN KEY ("product_id") REFERENCES "public"."product_inventory"("product_id");
