/*
  # Remove foreign keys from children table
  
  1. Changes
    - Remove foreign key constraint from parent_id column
    - Keep parent_id column but without constraint
  
  2. Security
    - Table will no longer enforce referential integrity with profiles table
    - This is for demo purposes only
*/

ALTER TABLE children
DROP CONSTRAINT IF EXISTS children_parent_id_fkey;