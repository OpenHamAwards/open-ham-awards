

export class User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  // member_since: Timestamp;
  member_id_club: string;
  profile_info: string;
  created_at!: Date;
  updated_at!: Date;

  constructor(id: string, full_name: string, email: string, password_hash: string, member_id_club: string, profile_info: string) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password_hash = password_hash;
    this.member_id_club = member_id_club;
    this.profile_info = profile_info;
  }

}