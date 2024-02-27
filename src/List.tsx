import React, {useState, useMemo, memo} from 'react';
import {View, StyleSheet, Platform, Pressable, Text} from 'react-native';
import {FlashList} from '@shopify/flash-list';

const styles = StyleSheet.create({
  low: {
    width: '100%',
    height: 25,
    backgroundColor: 'blue',
    borderWidth: 5,
  },
  medium: {
    width: '100%',
    height: 120,
    backgroundColor: 'blue',
    borderWidth: 5,
  },
  high: {
    width: '100%',
    height: 234,
    backgroundColor: 'green',
    borderWidth: 5,
  },
  separator: {
    marginTop: 10,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    minHeight: 50,
    borderWidth: 3,
    padding: 5,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
});

const LowElement = memo(() => {
  return <View style={styles.low} />;
});
const MediumElement = memo(() => {
  return <View style={styles.medium} />;
});

const HighElement = memo(() => {
  return <View style={styles.high} />;
});

const Separator = memo(() => <View style={styles.separator} />);
const Header = () => (
  <View style={styles.header}>
    <Text>{'HEADER'}</Text>
  </View>
);
const Footer = () => (
  <View style={styles.footer}>
    <Text>{'FOOTER'}</Text>
  </View>
);

type TData = {type: string; render: () => React.ReactElement};

const List = () => {
  const [removeElement, setRemoveElement] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const data: Array<TData> = useMemo(() => {
    return [
      {type: 'low_1', render: () => <LowElement />},
      {type: 'medium', render: () => <MediumElement />},
      {type: 'low', render: () => <LowElement />},
      {type: 'high_2', render: () => <HighElement />},
      removeElement ? null : {type: 'low', render: () => <LowElement />},
      removeElement ? null : {type: 'high', render: () => <HighElement />},
      {type: 'low', render: () => <LowElement />},
      {type: 'high_2', render: () => <HighElement />},
      {type: 'low', render: () => <LowElement />},
      {type: 'high_2', render: () => <HighElement />},
    ].filter(Boolean) as Array<TData>;
  }, [removeElement]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            setShouldRender(false);
            setTimeout(() => setShouldRender(true), 200);
          }}>
          <View style={styles.button}>
            <Text style={styles.text}>{'Reset'}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setRemoveElement(r => !r)}>
          <View style={styles.button}>
            <Text style={styles.text}>{'Toggle elements'}</Text>
          </View>
        </Pressable>
      </View>
      {shouldRender && (
        <FlashList<TData>
          data={data}
          renderItem={({item: {render}}) => render()}
          getItemType={({type}) => type}
          estimatedItemSize={230}
          ListHeaderComponent={Header}
          ListHeaderComponentStyle={{marginBottom: 30}}
          ListFooterComponent={Footer}
          ItemSeparatorComponent={Separator}
          removeClippedSubviews={Platform.OS !== 'ios'}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
      )}
    </View>
  );
};

export default List;
