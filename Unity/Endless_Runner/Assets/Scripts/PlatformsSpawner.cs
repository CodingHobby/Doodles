using UnityEngine;

public class PlatformsSpawner : MonoBehaviour {

	public GameObject platform;
	public Transform genPoint;
	public float platformDistance;

	private float platformWidth;

	public float platformDistanceMin;
	public float platformDistanceMax;

	private int platformSelector;

	private float[] platformWidths;

	public ObjectPooler[] pools;

	private float minHeight;
	public Transform maxHeightPoint;
	private float maxHeight;
	private float maxHeightChange;
	private float heightChange;

	void Start () {
		platformWidths = new float[pools.Length];

		for(int i = 0; i < platformWidths.Length; i++) {
			platformWidths[i] = pools[i].pooledObject.GetComponent<BoxCollider2D>().size.x;
		}

		minHeight = transform.position.y;
		maxHeightChange = 3;
		maxHeight = maxHeightPoint.position.y;
	}
	
	void Update () {
		if(transform.position.x < genPoint.position.x) {

			platformDistance = Random.Range(platformDistanceMin, platformDistanceMax);

			platformSelector = (int)Random.Range(0, pools.Length);

			heightChange = transform.position.y + Random.Range(-maxHeightChange, maxHeightChange);

			if(heightChange > maxHeight) {
				heightChange = maxHeight;
			} else if(heightChange < minHeight) {
				heightChange = minHeight;
			}

			transform.position = new Vector3(transform.position.x + (platformWidths[platformSelector] / 2) + platformDistance, heightChange, transform.position.z);
			
			GameObject newPlatform = pools[platformSelector].GetPooledObject();

			newPlatform.transform.position = transform.position;
			newPlatform.transform.rotation = transform.rotation;
			newPlatform.SetActive(true);

			transform.position = new Vector3(transform.position.x + (platformWidths[platformSelector] / 2), transform.position.y, transform.position.z);
		}
	}
}
