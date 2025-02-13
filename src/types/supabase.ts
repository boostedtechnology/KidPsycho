export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface AssessmentTemplate {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    text: string;
    type: 'scale' | 'boolean' | 'text' | 'multiple';
    options?: { value: number | string; label: string; }[];
    category?: string;
  }[];
}

export const ASSESSMENT_TEMPLATES: Record<string, AssessmentTemplate> = {
  'adhd': {
    id: 'adhd',
    title: 'ADHD Assessment',
    description: 'Comprehensive ADHD screening with behavioral and attention metrics',
    questions: [
      {
        id: 'attention-1',
        category: 'Attention & Focus',
        text: 'How often does your child have difficulty sustaining attention in tasks or play activities?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'attention-2',
        category: 'Attention & Focus',
        text: 'How frequently does your child make careless mistakes in schoolwork?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'hyperactivity-1',
        category: 'Hyperactivity',
        text: 'Does your child often fidget with hands/feet or squirm in their seat?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'hyperactivity-2',
        category: 'Hyperactivity',
        text: 'How often does your child have difficulty playing or engaging in leisure activities quietly?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'impulsivity-1',
        category: 'Impulsivity',
        text: 'How often does your child interrupt or intrude on others?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'executive-1',
        category: 'Executive Function',
        text: 'How well does your child organize tasks and activities?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very Well' },
          { value: 3, label: 'Well' },
          { value: 2, label: 'Moderately' },
          { value: 1, label: 'Poorly' },
          { value: 0, label: 'Very Poorly' }
        ]
      },
      {
        id: 'situational-1',
        category: 'Situational Assessment',
        text: 'In which situations do you notice these behaviors most frequently?',
        type: 'multiple',
        options: [
          { value: 'school', label: 'At school' },
          { value: 'home', label: 'At home' },
          { value: 'social', label: 'Social situations' },
          { value: 'homework', label: 'During homework' },
          { value: 'other', label: 'Other activities' }
        ]
      },
      {
        id: 'observation-1',
        category: 'Additional Observations',
        text: 'Please describe any specific situations or triggers that seem to affect your child\'s attention or behavior:',
        type: 'text'
      }
    ]
  },
  'autism': {
    id: 'autism',
    title: 'Autism Spectrum Assessment',
    description: 'Detailed evaluation for Autism Spectrum Disorder (ASD)',
    questions: [
      {
        id: 'social-1',
        category: 'Social Interaction',
        text: 'How does your child respond to their name being called?',
        type: 'scale',
        options: [
          { value: 4, label: 'Always responds' },
          { value: 3, label: 'Usually responds' },
          { value: 2, label: 'Sometimes responds' },
          { value: 1, label: 'Rarely responds' },
          { value: 0, label: 'Never responds' }
        ]
      },
      {
        id: 'social-2',
        category: 'Social Interaction',
        text: 'How often does your child make eye contact during interactions?',
        type: 'scale',
        options: [
          { value: 4, label: 'Consistently' },
          { value: 3, label: 'Often' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' }
        ]
      },
      {
        id: 'communication-1',
        category: 'Communication',
        text: 'How does your child typically communicate their needs?',
        type: 'multiple',
        options: [
          { value: 'verbal', label: 'Verbal speech' },
          { value: 'gestures', label: 'Gestures' },
          { value: 'pointing', label: 'Pointing' },
          { value: 'leading', label: 'Leading adults' },
          { value: 'other', label: 'Other methods' }
        ]
      },
      {
        id: 'behavior-1',
        category: 'Repetitive Behaviors',
        text: 'Does your child engage in repetitive movements or actions?',
        type: 'scale',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Very Often' }
        ]
      },
      {
        id: 'sensory-1',
        category: 'Sensory Processing',
        text: 'How does your child react to loud noises or bright lights?',
        type: 'scale',
        options: [
          { value: 0, label: 'No reaction' },
          { value: 1, label: 'Mild discomfort' },
          { value: 2, label: 'Moderate distress' },
          { value: 3, label: 'Significant distress' },
          { value: 4, label: 'Extreme distress' }
        ]
      },
      {
        id: 'play-1',
        category: 'Play & Imagination',
        text: 'How does your child engage in pretend play?',
        type: 'scale',
        options: [
          { value: 4, label: 'Frequently and creatively' },
          { value: 3, label: 'Sometimes with variety' },
          { value: 2, label: 'Limited scenarios' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' }
        ]
      }
    ]
  },
  'developmental': {
    id: 'developmental',
    title: 'Developmental Assessment',
    description: 'General developmental milestones and progress tracking',
    questions: [
      {
        id: 'motor-1',
        category: 'Motor Skills',
        text: 'How well does your child handle small objects (like buttons or crayons)?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very well' },
          { value: 3, label: 'Well' },
          { value: 2, label: 'With some difficulty' },
          { value: 1, label: 'With significant difficulty' },
          { value: 0, label: 'Unable to handle' }
        ]
      },
      {
        id: 'language-1',
        category: 'Language Development',
        text: 'How clearly does your child express their thoughts and needs verbally?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very clearly' },
          { value: 3, label: 'Mostly clear' },
          { value: 2, label: 'Somewhat clear' },
          { value: 1, label: 'Unclear' },
          { value: 0, label: 'Non-verbal' }
        ]
      },
      {
        id: 'cognitive-1',
        category: 'Cognitive Development',
        text: 'How well does your child understand and follow multi-step instructions?',
        type: 'scale',
        options: [
          { value: 4, label: 'Always follows' },
          { value: 3, label: 'Usually follows' },
          { value: 2, label: 'Sometimes follows' },
          { value: 1, label: 'Rarely follows' },
          { value: 0, label: 'Unable to follow' }
        ]
      }
    ]
  },
  'learning': {
    id: 'learning',
    title: 'Learning Disability Assessment',
    description: 'Evaluation of specific learning challenges and needs',
    questions: [
      {
        id: 'reading-1',
        category: 'Reading Skills',
        text: 'How does your child perform in reading compared to their peers?',
        type: 'scale',
        options: [
          { value: 4, label: 'Above grade level' },
          { value: 3, label: 'At grade level' },
          { value: 2, label: 'Slightly below' },
          { value: 1, label: 'Significantly below' },
          { value: 0, label: 'Unable to read' }
        ]
      },
      {
        id: 'writing-1',
        category: 'Writing Skills',
        text: 'Does your child struggle with handwriting or written expression?',
        type: 'scale',
        options: [
          { value: 0, label: 'No difficulties' },
          { value: 1, label: 'Minor difficulties' },
          { value: 2, label: 'Moderate difficulties' },
          { value: 3, label: 'Significant difficulties' },
          { value: 4, label: 'Severe difficulties' }
        ]
      },
      {
        id: 'math-1',
        category: 'Mathematical Skills',
        text: 'How well does your child understand mathematical concepts?',
        type: 'scale',
        options: [
          { value: 4, label: 'Excellent understanding' },
          { value: 3, label: 'Good understanding' },
          { value: 2, label: 'Fair understanding' },
          { value: 1, label: 'Poor understanding' },
          { value: 0, label: 'Very poor understanding' }
        ]
      }
    ]
  },
  'behavioral': {
    id: 'behavioral',
    title: 'Behavioral Assessment',
    description: 'Analysis of behavioral patterns and concerns',
    questions: [
      {
        id: 'emotional-1',
        category: 'Emotional Regulation',
        text: 'How well does your child manage their emotions?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very well' },
          { value: 3, label: 'Well' },
          { value: 2, label: 'Moderately' },
          { value: 1, label: 'Poorly' },
          { value: 0, label: 'Very poorly' }
        ]
      },
      {
        id: 'social-behavior-1',
        category: 'Social Behavior',
        text: 'How does your child interact with peers?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very positively' },
          { value: 3, label: 'Positively' },
          { value: 2, label: 'Neutral' },
          { value: 1, label: 'Negatively' },
          { value: 0, label: 'Very negatively' }
        ]
      },
      {
        id: 'conduct-1',
        category: 'Conduct',
        text: 'How often does your child follow rules and instructions?',
        type: 'scale',
        options: [
          { value: 4, label: 'Always' },
          { value: 3, label: 'Usually' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' }
        ]
      }
    ]
  },
  'medical': {
    id: 'medical',
    title: 'Medical Assessment',
    description: 'General health and medical history evaluation',
    questions: [
      {
        id: 'sleep-1',
        category: 'Sleep Patterns',
        text: 'How would you describe your child\'s sleep patterns?',
        type: 'scale',
        options: [
          { value: 4, label: 'Very regular' },
          { value: 3, label: 'Mostly regular' },
          { value: 2, label: 'Somewhat irregular' },
          { value: 1, label: 'Very irregular' },
          { value: 0, label: 'Severely disrupted' }
        ]
      },
      {
        id: 'appetite-1',
        category: 'Appetite & Eating',
        text: 'How would you rate your child\'s appetite?',
        type: 'scale',
        options: [
          { value: 4, label: 'Excellent' },
          { value: 3, label: 'Good' },
          { value: 2, label: 'Fair' },
          { value: 1, label: 'Poor' },
          { value: 0, label: 'Very poor' }
        ]
      },
      {
        id: 'medical-history-1',
        category: 'Medical History',
        text: 'Please describe any significant medical conditions or concerns:',
        type: 'text'
      }
    ]
  }
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'parent' | 'professional' | 'educator'
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'parent' | 'professional' | 'educator'
          full_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'parent' | 'professional' | 'educator'
          full_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          parent_id: string
          full_name: string
          date_of_birth: string
          gender: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          full_name: string
          date_of_birth: string
          gender?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          full_name?: string
          date_of_birth?: string
          gender?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          child_id: string
          creator_id: string
          type: 'behavioral' | 'developmental' | 'educational'
          status: 'draft' | 'pending_review' | 'completed'
          data: Json
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          creator_id: string
          type: 'behavioral' | 'developmental' | 'educational'
          status?: 'draft' | 'pending_review' | 'completed'
          data?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          creator_id?: string
          type?: 'behavioral' | 'developmental' | 'educational'
          status?: 'draft' | 'pending_review' | 'completed'
          data?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessment_shares: {
        Row: {
          id: string
          assessment_id: string
          profile_id: string
          created_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          profile_id: string
          created_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          profile_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          assessment_id: string | null
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          assessment_id?: string | null
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          assessment_id?: string | null
          content?: string
          created_at?: string
        }
      }
    }
    Enums: {
      user_role: 'parent' | 'professional' | 'educator'
      assessment_type: 'behavioral' | 'developmental' | 'educational'
      assessment_status: 'draft' | 'pending_review' | 'completed'
    }
  }
}