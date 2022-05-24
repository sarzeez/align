import React, {FC, Fragment, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Spacer from 'components/Spacer/Spacer';
import Card from 'components/Card/Card';
import LocationIcon from 'images/LocationIcon';
import RightArrowIcon from 'images/RightArrowIcon';
import ROUTES from 'navigation/routes';
import {Project} from 'store/reducers/types';
import {Colors} from 'theme';
import {styles} from './styles';
import Typography from 'components/Typography/Typography';
import {useDispatch} from 'react-redux';
import {setSelectedProjectItem} from 'store/actions/projects.actions';

type ListProps = {
  data: Project[];
  viewText?: string | undefined;
};

const ProjectsList: FC<ListProps> = ({data = [], viewText}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [viewVisible, setViewVisible] = useState(false);

  const handeSetSelectedProject = (project: any) => {
    dispatch(setSelectedProjectItem(project));
  };

  const handlePressView = () => {
    setViewVisible(true);
  };

  return (
    <View style={styles.projectsList}>
      {(viewVisible ? data : viewText ? data.slice(0, 4) : data).map(
        (item, i) => (
          <Fragment key={item.id}>
            <Card
              text={item.name}
              leftComponent={<LocationIcon color={Colors.orange} />}
              rightComponent={
                <RightArrowIcon style={{transform: [{translateX: 16}]}} />
              }
              onPress={() => {
                navigation.navigate(
                  ROUTES.PROJECT as never,
                  {
                    ...item,
                  } as never,
                );
                handeSetSelectedProject(item);
              }}
            />

            {i < data.length - 1 && <Spacer height={6} />}
          </Fragment>
        ),
      )}
      <Spacer height={26} />
      {!viewVisible && data.length >= 4 && (
        <TouchableOpacity onPress={handlePressView}>
          <Typography text={viewText} textCenter type="h3" underlined />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProjectsList;
