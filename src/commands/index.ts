import { requireNativeComponent } from 'react-native';
import { CustomCommand } from 'reactotron-core-client';
import reactotron from 'store/ReactotronConfig';

type Command = CustomCommand & {removeHandler?: () => void};
const commands: Command[] = 
[
  ...require('./UserLoginCommand').commands,
  ...require('./WorkSpaceCommands').commands
];

function registerCommands() {
  commands.forEach(command => {
    if (command.removeHandler) {
      command.removeHandler();
    }
    command.removeHandler = reactotron.onCustomCommand(command);
  });
}
export { registerCommands };

