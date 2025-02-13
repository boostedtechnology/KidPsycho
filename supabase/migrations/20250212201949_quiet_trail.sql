/*
  # Initial Schema Setup for Child Assessment Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (user_role enum)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `children`
      - `id` (uuid, primary key)
      - `parent_id` (uuid, references profiles)
      - `full_name` (text)
      - `date_of_birth` (date)
      - `gender` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `assessments`
      - `id` (uuid, primary key)
      - `child_id` (uuid, references children)
      - `creator_id` (uuid, references profiles)
      - `type` (assessment_type enum)
      - `status` (assessment_status enum)
      - `data` (jsonb)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `assessment_shares`
      - `id` (uuid, primary key)
      - `assessment_id` (uuid, references assessments)
      - `profile_id` (uuid, references profiles)
      - `created_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `assessment_id` (uuid, references assessments)
      - `content` (text)
      - `created_at` (timestamp)

  2. Enums
    - user_role: parent, professional, educator
    - assessment_type: behavioral, developmental, educational
    - assessment_status: draft, pending_review, completed

  3. Security
    - Enable RLS on all tables
    - Add policies for each table based on user roles
*/

-- Create enums
CREATE TYPE user_role AS ENUM ('parent', 'professional', 'educator');
CREATE TYPE assessment_type AS ENUM ('behavioral', 'developmental', 'educational');
CREATE TYPE assessment_status AS ENUM ('draft', 'pending_review', 'completed');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_id UNIQUE(user_id)
);

-- Create children table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES children ON DELETE CASCADE NOT NULL,
  creator_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  type assessment_type NOT NULL,
  status assessment_status DEFAULT 'draft',
  data jsonb DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessment_shares table
CREATE TABLE IF NOT EXISTS assessment_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(assessment_id, profile_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  assessment_id uuid REFERENCES assessments ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Children policies
CREATE POLICY "Parents can view own children"
  ON children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = children.parent_id
    )
  );

CREATE POLICY "Parents can insert own children"
  ON children FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = parent_id
      AND profiles.role = 'parent'
    )
  );

CREATE POLICY "Parents can update own children"
  ON children FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = parent_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.id = parent_id
    )
  );

-- Assessments policies
CREATE POLICY "Users can view assessments they created or have access to"
  ON assessments FOR SELECT
  USING (
    creator_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM assessment_shares
      WHERE assessment_shares.assessment_id = assessments.id
      AND assessment_shares.profile_id IN (
        SELECT id FROM profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create assessments"
  ON assessments FOR INSERT
  WITH CHECK (
    creator_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Creator can update assessment"
  ON assessments FOR UPDATE
  USING (
    creator_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    creator_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Assessment shares policies
CREATE POLICY "Users can view their assessment shares"
  ON assessment_shares FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create assessment shares for owned assessments"
  ON assessment_shares FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = assessment_id
      AND assessments.creator_id IN (
        SELECT id FROM profiles WHERE user_id = auth.uid()
      )
    )
  );

-- Messages policies
CREATE POLICY "Users can view messages they sent or received"
  ON messages FOR SELECT
  USING (
    sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR
    receiver_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );