import LottieView from 'lottie-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import colors from '../../config/colors';

function ActivityIndicator({
	visible = false,
	backgroundColor = 'primaryBackground',
}) {
	if (!visible) return null;

	return (
		<View
			style={[styles.overlay, { backgroundColor: colors[backgroundColor] }]}
		>
			{Platform.OS === 'android' && (
				<LottieView
					autoPlay
					loop
					style={styles.lottieView}
					source={require('../../assets/animations/loader_android.json')}
				/>
			)}
			{Platform.OS === 'ios' && (
				<LottieView
					autoPlay
					loop
					style={styles.lottieView}
					source={require('../../assets/animations/loader_ios.json')}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		height: '100%',
		opacity: 0.8,
		width: '100%',
		zIndex: 1,
	},
	lottieView: {
		flex: 1,
	},
});

export default ActivityIndicator;
