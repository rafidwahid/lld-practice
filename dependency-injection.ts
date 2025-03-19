@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}

// this ensures UserService gets UserRepository automatically without manual instantiation