export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      equipment: {
        Row: {
          affiliate_code: string | null
          affiliate_link: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          affiliate_code?: string | null
          affiliate_link?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          affiliate_code?: string | null
          affiliate_link?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      idea_equipment: {
        Row: {
          equipment_id: string
          idea_id: string
        }
        Insert: {
          equipment_id: string
          idea_id: string
        }
        Update: {
          equipment_id?: string
          idea_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_equipment_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "idea_equipment_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          age_range: Database["public"]["Enums"]["idea_age_range"] | null
          created_at: string
          id: string
          idea: string
          tags: string[] | null
          theme: string | null
          type: Database["public"]["Enums"]["idea_type"]
        }
        Insert: {
          age_range?: Database["public"]["Enums"]["idea_age_range"] | null
          created_at?: string
          id?: string
          idea: string
          tags?: string[] | null
          theme?: string | null
          type?: Database["public"]["Enums"]["idea_type"]
        }
        Update: {
          age_range?: Database["public"]["Enums"]["idea_age_range"] | null
          created_at?: string
          id?: string
          idea?: string
          tags?: string[] | null
          theme?: string | null
          type?: Database["public"]["Enums"]["idea_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          free_roles: number
          id: string
          nickname: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tiers"]
          tokens: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          free_roles?: number
          id: string
          nickname?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tiers"]
          tokens?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          free_roles?: number
          id?: string
          nickname?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tiers"]
          tokens?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      idea_age_range: "primary" | "secondary" | "college"
      idea_type: "basic" | "sponsored" | "collaboration"
      subscription_tiers: "free" | "paid" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
