/*
  # Allow anonymous access to children table
  
  1. Changes
    - Add policy to allow anonymous inserts into children table
    - Modify existing policies to allow anonymous access
  
  2. Security
    - This is for demo purposes only
    - In production, proper authentication should be required
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Parents can view own children" ON children;
DROP POLICY IF EXISTS "Parents can insert own children" ON children;
DROP POLICY IF EXISTS "Parents can update own children" ON children;

-- Create new policies for anonymous access
CREATE POLICY "Anyone can view children"
  ON children FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert children"
  ON children FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update children"
  ON children FOR UPDATE
  USING (true)
  WITH CHECK (true);